# Quiet Machines

Multi-host Astro site for the Quiet Machines company and its products.

- **Company:** [quietmachines.xyz](https://quietmachines.xyz) — studio story, mission, product directory
- **Products:** `wisp.`, `perch.`, and `sakana.` subdomains — each product’s own landing page

Architecture details: [`docs/HOSTING.md`](docs/HOSTING.md).

## Run

- `npm install`
- `npm run dev`
- `npm run build`
- `npm run preview`

Local product previews (no DNS required):

- `/` — company
- `/sites/wisp/` — Wisp
- `/sites/perch/` — Perch
- `/sites/sakana/` — Sakana (coming soon)

## Routes and offers

| Offer | USD, one time | Product host path | Payment Link variable |
| --- | --- | --- | --- |
| Wisp app | $9 | `wisp…/checkout` | `STRIPE_WISP_PAYMENT_LINK` |
| Wisp app + source | $19 | `wisp…/checkout/source` | `STRIPE_WISP_SOURCE_PAYMENT_LINK` |
| Perch app | $39 | `perch…/checkout` | `STRIPE_PERCH_PAYMENT_LINK` |
| Perch app + source | $69 | `perch…/checkout/source` | `STRIPE_PERCH_SOURCE_PAYMENT_LINK` |

Legacy `/apps/{product}` and `/checkout/{product}` paths 301 to the product hosts.

Source prices include the app. Prices and availability flags live in `src/data/store.ts`. Hosts and subdomain mapping live in `src/data/hosts.ts`. Offers stay unavailable until `appAvailable` / `sourceAvailable` are enabled and Stripe links are set.

## Opening purchases

1. Finish distribution, source packaging, and published terms; update status/availability together.
2. Configure four distinct one-time Stripe Payment Links; test in sandbox first.
3. Fulfill outside this static site (verify webhooks; never deliver from an unverified success URL).
4. Copy `.env.example` → `.env`, set links, enable flags, rebuild.
5. Keep source archives private — anything in `public/` is downloadable.

## Main implementation

- `src/data/hosts.ts` — subdomain registry + URL helpers
- `src/middleware.ts` — host → `/sites/{slug}` rewrite in dev
- `vercel.json` / `functions/_middleware.js` — production host rewrites
- `src/pages/index.astro` — company apex
- `src/pages/sites/[slug]/` — product sites (landing + checkout)
- `src/layouts/Store.astro` — shared shell (company vs product chrome)
- `src/components/ProductPage.astro` — Wisp / Perch landings (visuals unchanged)
- `src/components/ProductComingSoon.astro` — Sakana shell

`REBUILD-PLAN.md` remains the product-page research brief for a later visual pass.
