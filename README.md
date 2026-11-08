# PG Finds

A curated, model-assisted catalog of PostgreSQL resources discovered through Hacker News discussions. The source is the [open-index/hacker-news dataset](https://huggingface.co/datasets/open-index/hacker-news); the site’s methodology page describes selection and limitations. Links point to original resources and Hacker News discussions; full articles are not reproduced.

## Development

Requires Node.js 22.13 or newer.

```sh
npm ci
npm test
npm run build
```

The static export is written to `out/`. GitHub Actions publishes it to GitHub Pages on pushes to `main`. The application is configured for the `/pg-finds/` project path. Search, filtering, sorting, and reading-list storage run in the browser.

The archive and linked resources retain their respective owners' rights.
