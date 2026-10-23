export type Category = 'use-cases' | 'guides' | 'alternatives' | 'blog' | 'glossary';
export interface Section {
  title: string;
  paragraphs?: string[];
  steps?: string[];
  bullets?: string[];
  table?: { caption: string; columns: string[]; rows: string[][] };
  links?: { label: string; href: string }[];
}
export interface ContentPage {
  category: Category;
  slug: string;
  title: string;
  description: string;
  lead: string;
  sections: Section[];
  faqs?: { q: string; a: string }[];
  related: string[];
  published?: string;
}
export const contentDate = '2026-10-23';
export const pagePath = (page: Pick<ContentPage, 'category' | 'slug'>) => `/${page.category}/${page.slug}/`;
