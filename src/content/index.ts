import { useCases } from './use-cases';
import { guides } from './guides';
import { comparisons } from './alternatives';
import { articles } from './blog';
import { terms } from './glossary';
import { pagePath, type Category } from './types';

export const pages = [...useCases, ...guides, ...comparisons, ...articles, ...terms];
export const collections: { category: Category; title: string; heading: string; description: string; lead: string }[] = [
  { category: 'use-cases', title: 'Use cases', heading: 'Your workflow. Your agents. One place to check.', description: 'Explore Perch for developers, founders, agencies and parallel coding sessions, with dedicated Claude Code, Codex and Cursor workflows.', lead: 'Find the workflow that looks like yours. Each page explains where Perch helps, what the integration supports and what stays in your existing development process.' },
  { category: 'guides', title: 'Guides', heading: 'A clear next step.', description: 'Practical Perch guides for setup, agent compatibility, answering, keyboard shortcuts, privacy, troubleshooting and local sticky notes.', lead: 'Connect your first session, understand a request or work through a missing state. Start with the task you want to complete.' },
  { category: 'alternatives', title: 'Compare', heading: 'Find the right place for Perch.', description: 'Compare Perch with manual terminal checks, notifications and shared agent dashboards. Understand the tradeoffs without unverified product rankings.', lead: 'Compare ways of managing your attention around coding agents. Start with the problem you have: checking tabs, missing a handoff or needing a shared view.' },
  { category: 'blog', title: 'Blog', heading: 'Notes on working with agents.', description: 'Original Perch articles about parallel coding agents, deliberate approvals, local status monitoring and reducing the checking loop.', lead: 'Practical ways to keep agents moving while staying close enough to review their work. Written by the Perch team.' },
  { category: 'glossary', title: 'Glossary', heading: 'The words, in plain language.', description: 'Understand agent hooks, sessions, tool approvals, local-first software, human-in-the-loop decisions and context switching in Perch.', lead: 'Short definitions with the context that matters in a Perch workflow, and a useful next step for each term.' },
];
export const resourceHub = {
  path: '/resources/', title: 'Resources', heading: 'A little less checking. A little more understanding.',
  description: 'Perch resources: setup guides, coding-agent use cases, workflow comparisons, original articles and a plain-language glossary.',
  lead: 'Get connected, understand what each agent supports, and build a review routine that fits your work. Everything here is about using Perch alongside the agents you already have.',
};
export const findPage = (path: string) => pages.find(page => pagePath(page) === path);
export const collectionFor = (category: Category) => collections.find(collection => collection.category === category)!;
export const sectionId = (title: string) => title.toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
export const markdownPath = (path: string) => `/content${path.replace(/\/$/, '')}.md`;

// Fail at build time rather than silently publishing duplicate or dangling content.
const seen = new Set<string>();
for (const page of pages) {
  const path = pagePath(page);
  if (seen.has(path)) throw new Error(`Duplicate content path: ${path}`);
  seen.add(path);
  const ids = page.sections.map(section => sectionId(section.title));
  if (new Set(ids).size !== ids.length) throw new Error(`Duplicate section ID: ${path}`);
  for (const section of page.sections) {
    if (section.table?.rows.some(row => row.length !== section.table!.columns.length)) throw new Error(`Invalid table: ${path}`);
  }
}
const existing = new Set(['/', '/privacy/', '/terms/', '/checkout/', '/back/', '/resources/', ...collections.map(c => `/${c.category}/`)]);
for (const page of pages) {
  for (const path of [...page.related, ...page.sections.flatMap(s => (s.links ?? []).map(link => link.href))]) {
    if (path.startsWith('/') && !seen.has(path) && !existing.has(path)) throw new Error(`Missing content link ${path} in ${pagePath(page)}`);
  }
}
