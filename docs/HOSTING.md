# Quiet Machines multi-host architecture

## Hosts

| Host | Role |
| --- | --- |
| `quietmachines.xyz` | Company site — what Quiet Machines is, why it exists, product directory |
| `wisp.quietmachines.xyz` | Wisp product landing + checkout |
| `perch.quietmachines.xyz` | Perch product landing + checkout |
| `sakana.quietmachines.xyz` | Sakana coming-soon shell |

## How routing works

Astro builds a single static site. Each product site is mounted at:

```
/sites/{slug}/                 → product home
/sites/{slug}/checkout         → app offer (sellable products)
/sites/{slug}/checkout/source  → app + source offer
```

Subdomain requests are rewritten onto those mounts:

1. **Local dev** — `src/middleware.ts` rewrites `wisp.localhost` (and production hostnames if pointed at the dev server).
2. **Vercel** — `vercel.json` host-based rewrites.
3. **Cloudflare Pages** — `functions/_middleware.js`.

Shared assets stay at the apex root and are **not** rewritten:

- `/products/*.webp` (imagery — different from `/sites/`)
- `/fonts/*`, `/favicon.svg`, `/social-card.*`

## Local preview without DNS

```bash
npm run dev
```

Open path-based mounts directly:

- http://localhost:4321/
- http://localhost:4321/sites/wisp/
- http://localhost:4321/sites/perch/
- http://localhost:4321/sites/sakana/

Optional subdomain testing via `/etc/hosts`:

```
127.0.0.1 wisp.localhost perch.localhost sakana.localhost
```

Then visit `http://wisp.localhost:4321/`.

## DNS (production)

Point these at the same deployment:

- `quietmachines.xyz`
- `www.quietmachines.xyz` (optional redirect to apex)
- `wisp.quietmachines.xyz`
- `perch.quietmachines.xyz`
- `sakana.quietmachines.xyz`

A wildcard `*.quietmachines.xyz` is fine if your host supports it.

## Source of truth

- Host registry: `src/data/hosts.ts`
- Sellable offer data: `src/data/store.ts`
- Company copy/meta: `src/data/site.ts`
