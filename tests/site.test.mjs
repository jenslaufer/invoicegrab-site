// Tests for the InvoiceGrab site (plain static, no build step).
// Run: node tests/site.test.mjs   — exit 0 = green, 1 = red.
import { readFileSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (f) => readFileSync(join(root, f), 'utf8');

const STORE_ID = 'gkjglloohfeojkcflpafcahfkabdflom';
const CANONICAL = 'https://jenslaufer.com/invoicegrab-site/';
// The Chrome Web Store points its mandatory privacy link at this FILE, not at
// the directory (measured 2026-08-20 in the served listing HTML). Rebuilding
// index.html must not touch it, so the file is pinned by hash.
const PRIVACY_SHA256 =
  '3bef90feaa698b5871bc35f95a10d89fd67b8b5533c630b743365e5a1b8a7ab9';

let failed = 0;
const check = (name, fn) => {
  try {
    fn();
    console.log(`ok   ${name}`);
  } catch (e) {
    failed++;
    console.log(`FAIL ${name}\n     ${e.message}`);
  }
};
const assert = (cond, msg) => { if (!cond) throw new Error(msg); };

const index = read('index.html');

check('privacy.html is untouched (hash pinned)', () => {
  const sha = createHash('sha256').update(readFileSync(join(root, 'privacy.html'))).digest('hex');
  assert(sha === PRIVACY_SHA256, `privacy.html changed: ${sha}`);
});

check('index.html is a real page, not a redirect', () => {
  assert(!/http-equiv\s*=\s*["']refresh/i.test(index), 'meta refresh still present');
  assert(index.length > 4000, `index.html is only ${index.length} bytes`);
});

check('index.html links to the Chrome Web Store item', () => {
  assert(index.includes(`chromewebstore.google.com/detail/${STORE_ID}`),
    `store link for ${STORE_ID} missing`);
});

check('canonical points at the directory URL', () => {
  const m = index.match(/<link[^>]+rel=["']canonical["'][^>]*>/i);
  assert(m, 'no canonical link');
  assert(m[0].includes(CANONICAL), `canonical is not ${CANONICAL}: ${m[0]}`);
});

check('index.html keeps the privacy link reachable', () => {
  assert(/href=["']\.?\/?privacy\.html["']/.test(index), 'no link to privacy.html');
});

check('head basics: lang, viewport, description', () => {
  assert(/<html[^>]+lang=["']de["']/.test(index), 'lang="de" missing');
  assert(/name=["']viewport["']/.test(index), 'viewport meta missing');
  const d = index.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i);
  assert(d, 'meta description missing');
  assert(d[1].length <= 160, `description is ${d[1].length} chars (max 160)`);
});

check('every local asset referenced exists on disk', () => {
  const refs = [...index.matchAll(/(?:src|href)=["']([^"']+)["']/g)].map((m) => m[1]);
  const local = refs.filter((r) => !/^(https?:|mailto:|#|data:)/.test(r));
  const missing = local
    .map((r) => r.replace(/^\.?\//, '').split(/[?#]/)[0])
    .filter((r) => r && !existsSync(join(root, r)));
  assert(missing.length === 0, `missing: ${missing.join(', ')}`);
});

check('structured data parses and declares the right types', () => {
  const blocks = [...index.matchAll(
    /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)]
    .map((m) => JSON.parse(m[1]));
  assert(blocks.length > 0, 'no JSON-LD block');
  const types = blocks.map((b) => b['@type']);
  assert(types.includes('SoftwareApplication'), 'SoftwareApplication missing');
  assert(types.includes('FAQPage'), 'FAQPage missing');
});

// The PlaylistGrab lesson (2026-08-19): its store text promised a price that
// the checkout never sold. Any money figure on this page must be one that
// ExtPay actually offers for invoicegrab — 19 EUR/year or 3 EUR/month.
check('no price on the page that ExtPay does not sell', () => {
  const text = index.replace(/<[^>]+>/g, ' ');
  const found = [...text.matchAll(/(\d+(?:[.,]\d+)?)\s*(?:€|EUR|USD|\$)/gi)].map((m) => m[1]);
  const allowed = new Set(['19', '3']);
  const wrong = found.filter((f) => !allowed.has(f));
  assert(wrong.length === 0, `prices not sold by ExtPay: ${wrong.join(', ')}`);
  assert(found.includes('19') && found.includes('3'), `both plans must be named, found: ${found.join(', ')}`);
});

check('free tier is stated as shipped (5 per run)', () => {
  assert(/5\s*(Rechnungen|Belege)/i.test(index), 'free limit of 5 per run not stated');
});

console.log(failed === 0 ? '\nall green' : `\n${failed} failed`);
process.exit(failed === 0 ? 0 : 1);
