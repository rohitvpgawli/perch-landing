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

- `/`: Perch features, interactive agent/notes preview, integrations, pricing, FAQ.
- `/checkout/`: Availability and purchase details; noindex.
- `/privacy/`, `/terms/`: Current privacy and purchase information.
- `/robots.txt`, `/sitemap.xml`: Search discovery.
- `/llms.txt`, `/llms-full.txt`: Plain-text product information for assistants.
- Social metadata, SoftwareApplication JSON-LD, icons, web manifest, custom 404, security headers, and redirects for previous Perch paths are included.

Product copy is in `src/data/product.ts`; site/checkout settings are in `src/data/perch.ts`. Existing Perch screenshots and responsive styling are preserved. Other studio/product routes have been retired.

## Cloudflare deployment

`wrangler.jsonc` names the Worker `perchwebsite`, serves `dist/`, enables a real 404 page, and requests the `perched.fyi` custom domain. The domain must exist in the connected Cloudflare account. Use the Cloudflare MCP to select the account/zone and deploy the exact built assets when it is connected. CLI deployment is also configured as `npm run deploy`, but this task requests MCP deployment.

Deployed to https://perched.fyi through Cloudflare MCP on October 14, 2026. HTTPS, all 23 served files, 301 redirects, custom 404, security headers, and closed checkout were verified. See `docs/HOSTING.md` for deployment IDs and DNS propagation notes.

## Opening purchases later

1. Finish app signing/notarization, private distribution, verified payment fulfillment, and final purchase terms.
2. Enable the intended Stripe product/price and create a Payment Link for exactly $29 USD, one time. Configure Stripe Tax and required tax registrations, billing address and tax-ID collection as appropriate. Product tax category and price tax behavior must match the offer.
3. Verify payment and delivery in sandbox; never deliver based only on a success-page URL.
4. Set `STRIPE_PERCH_PAYMENT_LINK` and `PERCH_DELIVERY_READY=true` in the build environment, update availability in the plain-text discovery files, rebuild, and deploy.

The code requires both a live `buy.stripe.com` link and delivery readiness. Test links and unexpected checkout hosts fail the build. Keep app archives out of `public/`.

Support currently uses the repository’s public GitHub Issues. Do not post private customer or payment data there.
