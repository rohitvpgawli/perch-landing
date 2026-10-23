import type { APIRoute } from 'astro';
import overview from '../content/product-overview.txt?raw';
import { pages } from '../content/registry';
import { asMarkdown } from '../content/format';
export const GET: APIRoute = () => new Response([
  overview.trim(), '', '# Perch resource library', '',
  'The following sections contain the full text of the resource pages. Each includes its canonical HTML URL. The website is authoritative for availability; the Mac app and agent providers have separate data handling.', '',
  ...pages.map(page => asMarkdown(page)),
].join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
