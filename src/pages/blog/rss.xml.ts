import type { APIRoute } from 'astro';
import { perch } from '../../data/perch';
import { pages, pagePath } from '../../content/registry';
const xml = (text: string) => text.replace(/[<>&"']/g, c => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;' })[c]!);
export const GET: APIRoute = () => new Response(`<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel>
<title>Perch blog</title><link>${perch.origin}/blog/</link><description>Notes on working with coding agents, from the Perch team.</description><language>en</language><atom:link href="${perch.origin}/blog/rss.xml" rel="self" type="application/rss+xml"/>
${pages.filter(p => p.category === 'blog').map(page => `<item><title>${xml(page.title)}</title><link>${perch.origin}${pagePath(page)}</link><guid isPermaLink="true">${perch.origin}${pagePath(page)}</guid><pubDate>${new Date(`${page.published}T00:00:00Z`).toUTCString()}</pubDate><description>${xml(page.lead)}</description></item>`).join('\n')}
</channel></rss>\n`, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
