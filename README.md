# invoicegrab-site

Static site for the InvoiceGrab browser extension (Chrome and Firefox), served by GitHub Pages from
`master` at <https://invoicegrab.de/> (`CNAME`; since 2026-11-24). GitHub Pages
redirects the old `jenslaufer.com/invoicegrab-site/…` paths there with a 301.

| File | Purpose |
|---|---|
| `index.html` | How-to for "amazon rechnungen herunterladen" with InvoiceGrab as the shortcut. Searchers want the manual route, so the page answers first (SEO plan 2026-11-27). The visible "Stand" date must match `dateModified` in the WebPage JSON-LD |
| `privacy.html` | **The privacy policy the Chrome Web Store listing links to.** The store points at this FILE (`…/invoicegrab-site/privacy.html`), not at the directory — measured 2026-08-20 in the served listing HTML. Renaming or removing it tears off a mandatory listing link |
| `impressum.html` | Impressum (§ 5 DDG) — seller is Solytics GmbH, same data as `bieterpost-site/impressum.html` |
| `sitemap.xml` | Lists every HTML page; named in `robots.txt`. Inbound links: solytics.de/produkte/ links `https://invoicegrab.de/`; CWS, AMO and the jenslaufer.com menu still use the old path via the 301. Search Console: `sc-domain:invoicegrab.de` (DNS TXT at Namecheap, since 2026-11-27; the TXT record must stay), sitemap submitted |
| `<32 hex>.txt` | IndexNow key (public by design). After content changes: `ai-visibility.mjs indexnow invoicegrab.de <key>` pings Bing and Yandex with the whole sitemap |
| `llms.txt`, `index.md`, `faq.md` | Plain-text copies for LLMs and AI agents ([llmstxt.org](https://llmstxt.org)). Keep in sync with `index.html`; tests guard prices and FAQ questions. LLMs look for `llms.txt` at the host root, so this one is found only by link: `index.html` announces `index.md` as `<link rel="alternate" type="text/markdown">` and links `llms.txt` and `faq.md` in the footer |
| `CNAME`, `robots.txt` | Bind Pages to `invoicegrab.de`; crawl rules for the host root |
| `.nojekyll` | Stops GitHub Pages' Jekyll from rendering `index.md` over `index.html` |
| `img/` | Screenshots (WebP, from `invoicegrab/store/screenshots/`), icon, OG image |
| `tests/site.test.mjs` | Guards, run with `node tests/site.test.mjs` |

## Tests

No build, no CI — plain `node`, no dependencies:

```bash
node tests/site.test.mjs
```

They hold three things that cost money when they break:

1. `privacy.html` is pinned by sha256, so a page rebuild cannot silently move
   the store's privacy link.
2. Every price on the page must be one ExtPay actually sells (19 €/year only;
   the 3 €/month plan is archived since 2026-11-03). PlaylistGrab shipped a store text on 2026-08-19 promising a price
   its checkout never offered; this is the guard against repeating it.
3. Canonical, description, store link and local assets exist — a page Google
   cannot index is the same as no page.
4. `sitemap.xml` lists every HTML page exactly once, stays inside its own
   directory, and every `<lastmod>` matches the file's last commit date. The
   date is pinned to git, not to a constant: solytics#111 measured that the
   crawl rhythm follows `<lastmod>`, so one that says "today" for a page
   untouched since July is worse than none.

`robots.txt` allows everything and names the sitemap. It only works because this
directory is now the host root of `invoicegrab.de`.

## Assets

Screenshots come from the extension repo and are converted on update:

```bash
cwebp -q 78 -resize 1100 0 ~/repos/invoicegrab/store/screenshots/<name>.png -o img/<name>.webp
```
