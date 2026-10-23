import type { APIRoute } from 'astro';
import { pages, collections, pagePath } from '../../content/registry';
import { asMarkdown, hubMarkdown } from '../../content/format';
export function getStaticPaths() {
  return [
    ...pages.map(page => ({ params: { path: pagePath(page).slice(1, -1) }, props: { markdown: asMarkdown(page) } })),
    ...['/resources/', ...collections.map(c => `/${c.category}/`)].map(path => ({ params: { path: path.slice(1, -1) }, props: { markdown: hubMarkdown(path) } })),
  ];
}
export const GET: APIRoute = ({ props }) => new Response(props.markdown, { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
