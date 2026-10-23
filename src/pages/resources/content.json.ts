import type { APIRoute } from 'astro';
import { perch } from '../../data/perch';
import { pages, collections, pagePath, markdownPath, contentDate } from '../../content/registry';
export const GET: APIRoute = () => new Response(JSON.stringify({
  version: 1, site: perch.origin, updated: contentDate,
  collections: collections.map(c => ({ ...c, url: `${perch.origin}/${c.category}/` })),
  pages: pages.map(page => ({ ...page, updated: contentDate, url: perch.origin + pagePath(page), markdown: perch.origin + markdownPath(pagePath(page)) })),
}, null, 2) + '\n', { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
