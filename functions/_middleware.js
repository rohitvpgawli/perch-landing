/**
 * Cloudflare Pages middleware: map product subdomains onto /sites/{slug}.
 * Shared static assets (/products/*, /fonts/*, favicon, social card) stay at root.
 */

const PRODUCT_HOSTS = new Set(['wisp', 'perch', 'sakana']);

const PASSTHROUGH =
  /^\/(favicon\.svg|social-card\.(?:png|svg)|fonts\/|products\/|_)/;

export async function onRequest(context) {
  const url = new URL(context.request.url);
  const host = url.hostname.toLowerCase();
  const label = host.split('.')[0];

  const isProductHost =
    PRODUCT_HOSTS.has(label) &&
    (host.endsWith('.quietmachines.xyz') || host.endsWith('.localhost'));

  if (!isProductHost || PASSTHROUGH.test(url.pathname) || url.pathname.startsWith('/sites/')) {
    return context.next();
  }

  const mount = `/sites/${label}`;
  url.pathname = url.pathname === '/' ? `${mount}/` : `${mount}${url.pathname}`;
  return context.rewrite(url.toString());
}
