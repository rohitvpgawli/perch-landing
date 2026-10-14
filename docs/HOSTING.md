# Perch hosting

Production origin: `https://perched.fyi`.
Repository: `https://github.com/rohitvpgawli/perch-landing`.
Worker: `perchwebsite`.
Build: `npm ci && npm run build`.
Assets: `dist/`.
Configuration: `wrangler.jsonc`.

This is a standalone static site. There is no studio apex, product-subdomain middleware, Vercel configuration, payment API, or public app download. `_headers` adds browser security headers; `_redirects` preserves previous Perch paths. Unknown URLs use `404.html` with an HTTP 404.

Deployment through Cloudflare MCP requires a connected account with access to the `perched.fyi` zone. Select and inspect the zone before attaching the custom domain; do not replace an unrelated existing service without reviewing it.

Purchases remain closed. Checkout settings are build-time values, not runtime secrets. A public Payment Link cannot replace verified fulfillment. See README.md for the launch process.
