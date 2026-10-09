import { defineMiddleware } from 'astro:middleware';
import { resolveHost, rewriteProductPath } from './data/hosts';

/**
 * Host-based routing for local dev and any adapter that runs middleware.
 * Production static hosts should also apply the same rewrites (see vercel.json
 * and functions/_middleware.js).
 */
export const onRequest = defineMiddleware(async (context, next) => {
  const resolved = resolveHost(context.url.hostname);

  if (resolved.kind === 'product') {
    const target = rewriteProductPath(resolved.slug, context.url.pathname);
    if (target && target !== context.url.pathname) {
      return context.rewrite(target);
    }
  }

  return next();
});
