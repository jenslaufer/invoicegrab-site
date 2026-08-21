# invoicegrab-site

Static site for the InvoiceGrab Chrome extension, served by GitHub Pages from
`master` at <https://jenslaufer.com/invoicegrab-site/>.

| File | Purpose |
|---|---|
| `index.html` | Product page — the only surface outside the Chrome Web Store where someone can be convinced |
| `privacy.html` | **The privacy policy the Chrome Web Store listing links to.** The store points at this FILE (`…/invoicegrab-site/privacy.html`), not at the directory — measured 2026-08-20 in the served listing HTML. Renaming or removing it tears off a mandatory listing link |
| `sitemap.xml` | **The only discovery path Google has to this page.** Nothing links to `index.html` — the store listing points at `privacy.html`. Submitted separately in the Search Console, the same way `/otto/` and `/malaysia/` are. A sitemap under a subdirectory may only list URLs below it; entries outside are ignored without a word |
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
2. Every price on the page must be one ExtPay actually sells (19 €/year,
   3 €/month). PlaylistGrab shipped a store text on 2026-08-19 promising a price
   its checkout never offered; this is the guard against repeating it.
3. Canonical, description, store link and local assets exist — a page Google
   cannot index is the same as no page.
4. `sitemap.xml` lists every HTML page exactly once, stays inside its own
   directory, and every `<lastmod>` matches the file's last commit date. The
   date is pinned to git, not to a constant: solytics#111 measured that the
   crawl rhythm follows `<lastmod>`, so one that says "today" for a page
   untouched since July is worse than none.

There is deliberately **no `robots.txt`** — crawlers read it only from the host
root, so one here would be decoration. `jenslaufer.com/robots.txt` is 404, which
allows everything.

## Assets

Screenshots come from the extension repo and are converted on update:

```bash
cwebp -q 78 -resize 1100 0 ~/repos/invoicegrab/store/screenshots/<name>.png -o img/<name>.webp
```
