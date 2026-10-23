import { perch } from '../data/perch';
import { collections, pages, pagePath, resourceHub } from './registry';
import { contentDate, type ContentPage } from './types';

export function asMarkdown(page: ContentPage) {
  const lines = [`# ${page.title}`, '', `Canonical: ${perch.origin}${pagePath(page)}`, `Updated: ${contentDate}`, '', page.lead];
  for (const section of page.sections) {
    lines.push('', `## ${section.title}`, '', ...(section.paragraphs ?? []).flatMap(text => [text, '']));
    if (section.steps) lines.push(...section.steps.map((text, i) => `${i + 1}. ${text}`));
    if (section.bullets) lines.push(...section.bullets.map(text => `- ${text}`));
    if (section.table) {
      const cell = (value: string) => value.replace(/\|/g, '\\|').replace(/\n/g, ' ');
      lines.push('', section.table.caption, '', `| ${section.table.columns.map(cell).join(' | ')} |`, `| ${section.table.columns.map(() => '---').join(' | ')} |`, ...section.table.rows.map(row => `| ${row.map(cell).join(' | ')} |`));
    }
    for (const link of section.links ?? []) lines.push('', `[${link.label}](${link.href.startsWith('/') ? perch.origin + link.href : link.href})`);
  }
  if (page.faqs?.length) {
    lines.push('', '## Common questions');
    for (const item of page.faqs) lines.push('', `### ${item.q}`, '', item.a);
  }
  lines.push('', '## Related reading');
  for (const path of page.related) lines.push(`- [${pages.find(p => pagePath(p) === path)?.title ?? collections.find(c => `/${c.category}/` === path)?.title ?? path}](${perch.origin}${path})`);
  return lines.join('\n').trim() + '\n';
}

export function hubMarkdown(path: string) {
  const collection = collections.find(c => `/${c.category}/` === path);
  const hub = collection ?? resourceHub;
  const items = collection ? pages.filter(page => page.category === collection.category).map(page => ({ title: page.title, path: pagePath(page), description: page.description })) : collections.map(c => ({ title: c.title, path: `/${c.category}/`, description: c.description }));
  return [`# ${hub.title}`, '', `Canonical: ${perch.origin}${path}`, '', hub.lead, '', ...items.map(item => `- [${item.title}](${perch.origin}${item.path}): ${item.description}`), ''].join('\n');
}

export function contentSchema(page: ContentPage) {
  const url = perch.origin + pagePath(page);
  const org = { '@type': 'Organization', '@id': `${perch.origin}/#organization`, name: perch.company, url: perch.origin };
  const article = page.category === 'blog' || page.category === 'guides' || page.category === 'alternatives';
  const termNames: Record<string, string> = { 'agent-hook': 'Agent hook', 'agent-session': 'Coding-agent session', 'human-in-the-loop': 'Human-in-the-loop', 'local-first': 'Local-first', 'tool-approval': 'Tool approval', 'context-switching': 'Context switching' };
  const entity = page.category === 'glossary'
    ? { '@type': 'DefinedTerm', '@id': `${url}#term`, name: termNames[page.slug] ?? page.title, description: page.lead, url, inDefinedTermSet: `${perch.origin}/glossary/#terms` }
    : { '@type': article ? (page.category === 'blog' ? 'BlogPosting' : 'TechArticle') : 'WebPage', '@id': `${url}#page`, headline: page.title, name: page.title, description: page.description, url, inLanguage: 'en', ...(article ? { datePublished: page.published ?? contentDate, dateModified: contentDate, author: { '@type': 'Organization', name: 'Perch team', url: `${perch.origin}/resources/` }, publisher: { '@id': org['@id'] }, image: `${perch.origin}/social-card.png`, mainEntityOfPage: url } : {}), about: { '@type': 'SoftwareApplication', name: 'Perch', url: perch.origin } };
  return {
    '@context': 'https://schema.org', '@graph': [org, entity,
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${perch.origin}/` },
        { '@type': 'ListItem', position: 2, name: collections.find(c => c.category === page.category)!.title, item: `${perch.origin}/${page.category}/` },
        { '@type': 'ListItem', position: 3, name: page.title, item: url },
      ] },
      ...(page.faqs?.length ? [{ '@type': 'FAQPage', '@id': `${url}#questions`, mainEntity: page.faqs.map(item => ({ '@type': 'Question', name: item.q, acceptedAnswer: { '@type': 'Answer', text: item.a } })) }] : []),
    ],
  };
}
