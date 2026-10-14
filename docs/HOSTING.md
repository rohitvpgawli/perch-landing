# Perch hosting

Production origin: `https://perched.fyi`.
Repository: `https://github.com/rohitvpgawli/perch-landing`.
Worker: `perch-landing` (Workers Builds deploys every push to `main`).
Canonical host: `worker/index.js` 301-redirects `http://` and `www.` to `https://perched.fyi`.
Build: `npm ci && npm run build`.
Assets: `dist/`.
Configuration: `wrangler.jsonc`.

This is a static site with a minimal canonical-host Worker. There is no studio apex, product-subdomain middleware, Vercel configuration, payment API, or public app download. `_headers` adds browser security headers; `_redirects` preserves previous Perch paths. Unknown URLs use `404.html` with an HTTP 404.

Deployment through Cloudflare MCP requires a connected account with access to the `perched.fyi` zone. Select and inspect the zone before attaching the custom domain; do not replace an unrelated existing service without reviewing it.

Purchases remain closed. Checkout settings are build-time values, not runtime secrets. A public Payment Link cannot replace verified fulfillment. See README.md for the launch process.

## Deployed October 14, 2026

Deployed through the authenticated Cloudflare API MCP, with short-lived asset-upload authorization for binary uploads. This uses real Workers static assets, with `_headers` and `_redirects` preserved as asset configuration.

- Account: `9162db11ae335d803082e2df44534a88`
- Zone: `a913c643c487f4e336ab78dd3d0aa8c0`
- Worker version: `7a3a205b-547f-428a-88c0-e4b4a27dd443`
- Deployment: `ef42ff42-f964-4fa5-8b13-afa62d7b6b60`
- Domain: `https://perched.fyi/`
- Built source: `ad150c0` (subsequent documentation/configuration updates do not change the built site).

Verification: all 23 served files matched local build bytes over verified HTTPS; home, checkout, privacy, terms, robots, sitemap, llms files, social image, icons, fonts, and script/styles returned expected status codes. Missing pages returned HTTP 404 with the custom page. Legacy Perch paths returned 301 redirects. HTML security headers were present. Checkout remains closed. Public Cloudflare DNS returned apex A records; the local resolver was still propagating at verification time.
