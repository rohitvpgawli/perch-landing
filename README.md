# Perchwebsite

Standalone Perch landing page for **https://perched.fyi**, built with Astro and deployed as Cloudflare Workers static assets.

Perch is a native macOS 14+ utility for local coding-agent activity and sticky notes. The offer is **$29 USD, one time**, plus applicable taxes. App license only; source code is not included.

**Purchases are deliberately closed until delivery is ready.** The purchase page collects no payment. Final license, update, support, device, and refund terms must be published before launch.

## Development

```sh
npm ci
npm run dev
npm run build
npm run preview
```

## Pages and discovery

- `/`: Perch landing page with a live, interactive demo (`src/components/store/LiveDemo.astro`), features, privacy, agent coverage, pricing, FAQ.
- `/checkout/`: Availability and purchase details; noindex.
- `/privacy/`, `/terms/`: Current privacy and purchase information.
- `/robots.txt`, `/sitemap.xml`: Search discovery.
- `/llms.txt`, `/llms-full.txt`: Plain-text product information for assistants.
- Social metadata, SoftwareApplication JSON-LD, icons, web manifest, custom 404, security headers, and redirects for previous Perch paths are included.

Product copy is in `src/data/product.ts`; site/checkout settings are in `src/data/perch.ts`. Existing Perch screenshots and responsive styling are preserved. Other studio/product routes have been retired.

## Cloudflare deployment

`wrangler.jsonc` names the Worker `perch-landing`, serves `dist/`, enables a real 404 page, and attaches the `perched.fyi` and `www.perched.fyi` custom domains. `worker/index.js` runs before assets and 301-redirects `http://` and `www.` requests to `https://perched.fyi`.

Pushes to `main` deploy automatically through Cloudflare Workers Builds (connected to the `perch-landing` Worker). Manual deployment: `npm run deploy`.

Deployed to https://perched.fyi through Cloudflare MCP on October 14, 2026. HTTPS, all 23 served files, 301 redirects, custom 404, security headers, and closed checkout were verified. See `docs/HOSTING.md` for deployment IDs and DNS propagation notes.

## Waitlist

While checkout is closed, every purchase CTA becomes an email form (`src/components/store/Waitlist.astro`) that posts to `POST /api/waitlist` in `worker/index.js`. Addresses go to the `perch-waitlist` D1 database (`WAITLIST` binding, schema in `migrations/`), one row per email with source form, country, timestamp and any `utm_*` tags from the link the visitor arrived on (kept in session storage across pages by `src/layouts/Store.astro`). Apply new migrations with `npx wrangler d1 migrations apply perch-waitlist --remote` **before** deploying a Worker that writes the new columns. Once `checkoutReady` is true the forms switch back to buy buttons.

```sh
npx wrangler d1 execute perch-waitlist --remote --command "select * from waitlist order by created_at desc"
```

Run the full site with the API locally via the `perch-worker` config in `.claude/launch.json` (`npm run build` first; `npx wrangler d1 migrations apply perch-waitlist --local` once).

## Analytics

Page-level analytics use Cloudflare Web Analytics (cookieless). Add `perched.fyi` under Analytics & Logs → Web Analytics with automatic setup **off**, copy the site token, and set `CF_WEB_ANALYTICS_TOKEN` in the build environment (or `.env`) before `npm run deploy`. The beacon is omitted when the token is empty; the CSP in `public/_headers` already allows it.

## Opening purchases later

1. Finish app signing/notarization, private distribution, verified payment fulfillment, and final purchase terms.
2. Enable the intended Stripe product/price and create a Payment Link for exactly $29 USD, one time. Configure Stripe Tax and required tax registrations, billing address and tax-ID collection as appropriate. Product tax category and price tax behavior must match the offer.
3. Verify payment and delivery in sandbox; never deliver based only on a success-page URL.
4. Set `STRIPE_PERCH_PAYMENT_LINK` and `PERCH_DELIVERY_READY=true` in the build environment, update availability in the plain-text discovery files, rebuild, and deploy.

The code requires both a live `buy.stripe.com` link and delivery readiness. Test links and unexpected checkout hosts fail the build. Keep app archives out of `public/`.

Support is by email at support@trillium.one (One Trinity Consulting Inc.). Launch pricing is $29 for the first 1,000 customers, then $99 (`launchSeats` and `regularPrice` in `src/data/perch.ts`).
