// Tests for the InvoiceGrab site (plain static, no build step).
// Run: node tests/site.test.mjs   — exit 0 = green, 1 = red.
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (f) => readFileSync(join(root, f), 'utf8');

const STORE_ID = 'gkjglloohfeojkcflpafcahfkabdflom';
const CANONICAL = 'https://jenslaufer.com/invoicegrab-site/';
// The Chrome Web Store points its mandatory privacy link at this FILE, not at
// the directory (measured 2026-08-20 in the served listing HTML). Rebuilding
// index.html must not touch it, so the file is pinned by hash.
// Pin moved once, on 2026-08-22 (#5): privacy.html gained two links back to the
// product page. The store URL is unchanged — the pin went red on purpose, which
// is what it is for.
const PRIVACY_SHA256 =
  'e9d4b1d6ca26f16b184c24f3c3b80968c7c6e1ead07c2f00b00745965a1d7dad';

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

// Measured 2026-08-22 (GSC): privacy.html indexed, last crawled 14.08.;
// index.html "URL is unknown to Google", never crawled — same directory,
// sitemap submitted and read that morning. The difference is one inbound
// link: the store points at privacy.html, nothing points at index.html.
// The page that IS crawled must not be a dead end for the crawler.
check('privacy.html gives the product page a crawl path', () => {
  const privacy = read('privacy.html');
  const hrefs = [...privacy.matchAll(/href=["']([^"']+)["']/g)].map((m) => m[1]);
  const toProduct = hrefs.filter((h) => h === './' || h === '.' || h === 'index.html'
    || h === './index.html' || h === CANONICAL);
  assert(toProduct.length > 0,
    `privacy.html links nowhere on this site (only: ${hrefs.join(', ') || 'none'})`);
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

// ---------------------------------------------------------------- discovery
// The page went live 2026-08-20 and nothing pointed at it: no sitemap entry,
// and the store links privacy.html rather than index.html. A page Google has
// no path to is the same as no page (issue #3). The sub-sitemap pattern is the
// one /otto/ and /malaysia/ already use on this host.
const SITEMAP_NS = 'http://www.sitemaps.org/schemas/sitemap/0.9';
const locs = () => {
  const xml = read('sitemap.xml');
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
};

check('sitemap.xml exists and declares the sitemap namespace', () => {
  assert(existsSync(join(root, 'sitemap.xml')), 'sitemap.xml missing');
  const xml = read('sitemap.xml');
  assert(xml.startsWith('<?xml'), 'no XML declaration');
  assert(xml.includes(SITEMAP_NS), `urlset namespace ${SITEMAP_NS} missing`);
});

// A sitemap is only honoured for URLs at or below its own path. An entry
// outside /invoicegrab-site/ is silently ignored, which reads as "submitted".
check('every sitemap URL sits under the canonical directory', () => {
  const outside = locs().filter((u) => !u.startsWith(CANONICAL));
  assert(locs().length > 0, 'sitemap lists no URL at all');
  assert(outside.length === 0, `outside ${CANONICAL}: ${outside.join(', ')}`);
});

check('every sitemap URL resolves to a file in this repo', () => {
  const missing = locs()
    .map((u) => u.slice(CANONICAL.length))
    .map((rel) => (rel === '' ? 'index.html' : rel))
    .filter((rel) => !existsSync(join(root, rel)));
  assert(missing.length === 0, `listed but not on disk: ${missing.join(', ')}`);
});

// The guard that keeps working after today: a page added later and forgotten
// is invisible, and nothing else in the repo would notice.
check('every HTML page in the repo is listed exactly once', () => {
  const pages = readdirSync(root).filter((f) => f.endsWith('.html')).sort();
  const listed = locs().map((u) => (u === CANONICAL ? 'index.html' : u.slice(CANONICAL.length)));
  const missing = pages.filter((p) => !listed.includes(p));
  assert(missing.length === 0, `not in sitemap: ${missing.join(', ')}`);
  const dupes = listed.filter((u, i) => listed.indexOf(u) !== i);
  assert(dupes.length === 0, `listed twice: ${dupes.join(', ')}`);
});

// lastmod only helps while it is true. solytics#111 measured that the crawl
// rhythm follows it, so a date that says "today" for a page untouched since
// July is worse than none — it teaches the crawler to ignore the signal.
// Pinned to git rather than to a constant, so it cannot rot in place.
check('every lastmod equals the file\'s last commit date', () => {
  const xml = read('sitemap.xml');
  const entries = [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((m) => m[1]);
  assert(entries.length === locs().length, 'not every <loc> sits in a <url> block');
  for (const e of entries) {
    const loc = e.match(/<loc>([^<]+)<\/loc>/)[1].trim();
    const rel = loc === CANONICAL ? 'index.html' : loc.slice(CANONICAL.length);
    const d = e.match(/<lastmod>(\d{4}-\d{2}-\d{2})<\/lastmod>/);
    assert(d, `no ISO lastmod for ${rel}`);
    const committed = execFileSync('git', ['log', '-1', '--format=%cs', '--', rel],
      { cwd: root, encoding: 'utf8' }).trim();
    assert(committed, `git cannot date ${rel} — cannot verify lastmod`);
    assert(d[1] === committed,
      `lastmod for ${rel} is ${d[1]}, last commit was ${committed}`);
  }
});

// robots.txt is read from the host root only; one in this directory would be
// decoration. jenslaufer.com/robots.txt is 404 today, so nothing blocks us.
check('no robots.txt pretending to control a subdirectory', () => {
  assert(!existsSync(join(root, 'robots.txt')),
    'robots.txt in a subdirectory is never read by a crawler');
});

console.log(failed === 0 ? '\nall green' : `\n${failed} failed`);
process.exit(failed === 0 ? 0 : 1);
