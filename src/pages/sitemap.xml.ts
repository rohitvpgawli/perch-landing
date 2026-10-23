import type { APIRoute } from 'astro';
import { perch } from '../data/perch';
import { collections, pages, pagePath, contentDate } from '../content/registry';
export const GET: APIRoute = () => {
  const oldPaths = ['/', '/privacy/', '/terms/', '/back/'];
  const newPaths = ['/resources/', ...collections.map(c => `/${c.category}/`), ...pages.map(pagePath)];
  const entries = [...oldPaths.map(path => ({ path, modified: false })), ...newPaths.map(path => ({ path, modified: true }))];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.map(({ path, modified }) => `  <url><loc>${perch.origin}${path}</loc>${modified ? `<lastmod>${contentDate}</lastmod>` : ''}</url>`).join('\n')}\n</urlset>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
