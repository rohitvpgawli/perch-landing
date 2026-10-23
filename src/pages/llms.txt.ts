import type { APIRoute } from 'astro';
import summary from '../content/product-summary.txt?raw';
import { collections, pages, pagePath } from '../content/registry';
import { perch } from '../data/perch';
export const GET: APIRoute = () => new Response([
  summary.trim(), '', '## Resource collections', '',
  `- [Resources](${perch.origin}/resources/): Start here for all product documentation.`,
  ...collections.map(c => `- [${c.title}](${perch.origin}/${c.category}/): ${c.description}`),
  '', '## Individual pages', '', ...pages.map(page => `- [${page.title}](${perch.origin}${pagePath(page)}): ${page.description}`),
  '', '## Machine-readable formats', '',
  `- [Content index](${perch.origin}/resources/content.json): Full structured content, canonical URLs and Markdown URLs.`,
  `- [Blog RSS](${perch.origin}/blog/rss.xml): Articles with canonical permalinks.`,
  'Every resource page links to its corresponding Markdown representation under /content/.', '',
].join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
