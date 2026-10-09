/**
 * Multi-host architecture for Quiet Machines.
 *
 * Production hosts:
 *   quietmachines.xyz              → company site
 *   wisp.quietmachines.xyz         → Wisp product site
 *   perch.quietmachines.xyz        → Perch product site
 *   sakana.quietmachines.xyz       → Sakana (coming soon)
 *
 * Static build mounts each product site under `/sites/{slug}/…`.
 * Dev middleware and deploy rewrites map subdomain requests onto those mounts.
 * Asset paths under `/products/*.webp` are unrelated and must not be rewritten.
 */

export const ROOT_DOMAIN = 'quietmachines.xyz';

export type ProductSlug = 'wisp' | 'perch' | 'sakana';
export type ProductAvailability = 'live' | 'soon';

export interface ProductHost {
  slug: ProductSlug;
  name: string;
  /** DNS label: `{subdomain}.{ROOT_DOMAIN}` */
  subdomain: string;
  availability: ProductAvailability;
  /** One-line pitch for the company shelf */
  pitch: string;
  /** Short status label shown on the company site */
  status: string;
}

/** Mount prefix used in the static build and local path-based preview. */
export const SITES_MOUNT = '/sites';

export const productHosts: ProductHost[] = [
  {
    slug: 'wisp',
    name: 'Wisp',
    subdomain: 'wisp',
    availability: 'live',
    pitch: 'On-device dictation that keeps up with how you think.',
    status: 'In development',
  },
  {
    slug: 'perch',
    name: 'Perch',
    subdomain: 'perch',
    availability: 'live',
    pitch: 'Agent status and sticky notes at the edge of your screen.',
    status: 'In development',
  },
  {
    slug: 'sakana',
    name: 'Sakana',
    subdomain: 'sakana',
    availability: 'soon',
    pitch: 'Something is moving under the surface.',
    status: 'Coming soon',
  },
];

export const productSlugs = productHosts.map((p) => p.slug);

export function isProductSlug(value: string): value is ProductSlug {
  return productSlugs.includes(value as ProductSlug);
}

export function getProductHost(slug: string): ProductHost | undefined {
  return productHosts.find((p) => p.slug === slug);
}

export function companyOrigin(): string {
  return `https://${ROOT_DOMAIN}`;
}

export function productOrigin(slug: ProductSlug): string {
  const host = getProductHost(slug);
  if (!host) throw new Error(`Unknown product slug: ${slug}`);
  return `https://${host.subdomain}.${ROOT_DOMAIN}`;
}

/** Path prefix for a product site inside the static build. */
export function siteMount(slug: ProductSlug): string {
  return `${SITES_MOUNT}/${slug}`;
}

/**
 * Public URL for a product page.
 * In `astro dev`, returns the local `/sites/{slug}` mount so subdomains are optional.
 * In production builds, returns the real subdomain URL.
 */
export function productHref(slug: ProductSlug, path = '/'): string {
  const normalized = normalizePath(path);
  if (import.meta.env.DEV) {
    return normalized === '/' ? `${siteMount(slug)}/` : `${siteMount(slug)}${normalized}`;
  }
  return normalized === '/' ? `${productOrigin(slug)}/` : `${productOrigin(slug)}${normalized}`;
}

export function companyHref(path = '/'): string {
  const normalized = normalizePath(path);
  if (import.meta.env.DEV) {
    return normalized;
  }
  return normalized === '/' ? `${companyOrigin()}/` : `${companyOrigin()}${normalized}`;
}

export type ResolvedHost =
  | { kind: 'company' }
  | { kind: 'product'; slug: ProductSlug }
  | { kind: 'unknown' };

/** Resolve a request hostname to company or product host. */
export function resolveHost(hostname: string): ResolvedHost {
  const host = hostname.toLowerCase().split(':')[0];

  if (
    host === ROOT_DOMAIN ||
    host === `www.${ROOT_DOMAIN}` ||
    host === 'localhost' ||
    host === '127.0.0.1' ||
    host.endsWith('.localhost')
  ) {
    // product.localhost support for local subdomain testing
    const localProduct = host.match(/^(wisp|perch|sakana)\.localhost$/);
    if (localProduct && isProductSlug(localProduct[1])) {
      return { kind: 'product', slug: localProduct[1] };
    }
    return { kind: 'company' };
  }

  for (const product of productHosts) {
    if (host === `${product.subdomain}.${ROOT_DOMAIN}`) {
      return { kind: 'product', slug: product.slug };
    }
  }

  return { kind: 'unknown' };
}

/** Paths that must stay at the site root (shared static assets). */
export function isPassthroughPath(pathname: string): boolean {
  if (pathname === '/favicon.svg') return true;
  if (pathname === '/social-card.png' || pathname === '/social-card.svg') return true;
  if (pathname.startsWith('/fonts/')) return true;
  // Existing product imagery lives under /products/*.webp — do not rewrite.
  if (pathname.startsWith('/products/')) return true;
  if (pathname.startsWith('/_')) return true;
  if (pathname.startsWith('/@')) return true;
  if (pathname.startsWith('/node_modules/')) return true;
  if (pathname.startsWith('/src/')) return true;
  if (pathname.startsWith('/.astro/')) return true;
  return /\.(?:avif|css|gif|ico|jpeg|jpg|js|json|map|mjs|png|svg|webp|woff2?)$/i.test(pathname);
}

/**
 * Map a product-subdomain pathname onto the static `/sites/{slug}` mount.
 * Returns null when no rewrite is needed.
 */
export function rewriteProductPath(slug: ProductSlug, pathname: string): string | null {
  if (isPassthroughPath(pathname)) return null;

  const mount = siteMount(slug);
  if (pathname === mount || pathname.startsWith(`${mount}/`)) return null;

  // Avoid double-mounting if someone hits another product mount on this host.
  if (pathname.startsWith(`${SITES_MOUNT}/`)) return null;

  if (pathname === '/') return `${mount}/`;
  return `${mount}${pathname}`;
}

/**
 * Canonical public URL for the current request path.
 * Converts `/sites/wisp/checkout` → `https://wisp.quietmachines.xyz/checkout`.
 */
export function canonicalUrl(url: URL): string {
  const match = url.pathname.match(/^\/sites\/([^/]+)(\/.*)?$/);
  if (match && isProductSlug(match[1])) {
    const rest = match[2] && match[2] !== '' ? match[2] : '/';
    return `${productOrigin(match[1])}${rest === '/' ? '/' : rest}${url.search}`;
  }

  const path = url.pathname === '' ? '/' : url.pathname;
  return `${companyOrigin()}${path}${url.search}`;
}

function normalizePath(path: string): string {
  if (!path || path === '/') return '/';
  return path.startsWith('/') ? path : `/${path}`;
}
