# Perch resource library

All website work is confined to `perch-website`. The main landing component, its demo, pricing, waitlist, product facts and the shared `store.css` design system are preserved. Only shared navigation/footer links and optional metadata hooks were added to the existing shell.

## Reference audit — October 23, 2026

Reference: [Flit sitemap](https://flit.fyi/sitemap.xml), [comparison hub](https://flit.fyi/alternatives), [developer use case](https://flit.fyi/use-cases/developers).

The public sitemap contained 1,007 URLs. All 153 English pages were fetched and scanned for titles, H1/H2 headings, descriptions, canonicals, internal links and schema types. The remaining 854 localized URLs were fetched and checked for title, H1 and canonical metadata. All fetches succeeded. This was a structural/metadata audit, not a line-by-line review of every translated article.

English page families: 35 comparison URLs, 13 use-case URLs, 11 blog URLs, 48 glossary URLs, four changelog URLs, a guides hub, setup/product/legal pages and query-specific troubleshooting/integration guides. Hub counts include their index page. The useful patterns are navigable topic hubs, specific intent per detail page, direct answers, clear scope limits, FAQs, related links, breadcrumbs and machine-readable representations.

Perch uses that organization with original product-specific writing. Flit copy, pricing, imagery and design were not reused. No changelog was invented. Comparisons cover workflows rather than unverified named-product rankings. Current Perch facts come from `src/data/product.ts`, `src/data/perch.ts`, the existing privacy policy and the existing machine-readable product overview. These are more current than the older Mac-app marketing reference in the parent directory.

## Content and routes

- Six hubs: `/resources/`, `/use-cases/`, `/guides/`, `/alternatives/`, `/blog/`, `/glossary/`.
- Seven use cases: developers, founders, agencies, parallel agents, Claude Code, Codex CLI, Cursor local Agent.
- Seven guides: getting started, compatibility, answering, shortcuts, privacy/permissions, missing activity, sticky notes.
- Three comparisons: manual terminal checks, notifications, shared dashboards.
- Five blog articles: parallel-agent monitoring, status without transcripts, human decisions, the checking loop, monitor/agent/orchestrator roles.
- Six definitions: hooks, sessions, human-in-the-loop, local-first, tool approvals, context switching.

Content is authored in typed `src/content/*.ts` modules and statically rendered through `src/pages/[...path].astro`. The route handles only explicit static paths; the existing custom 404 remains in place. Editorial layouts reuse Store, policy styles, buttons, tokens and native details/FAQ behavior. New layout CSS is restricted to `resource-*` classes. Menus use native details/summary with progressive enhancement for motion, arrow-key navigation, Escape, outside clicks, focus leaving the menu and closing other menus.

`src/content/index.ts` is the page registry. `src/content/format.ts` generates the text and structured data from the same visible content. Build-time checks reject duplicate routes, duplicate section IDs, invalid table widths and missing related links.

## Discovery

- Static, complete HTML; all content and links are available without JavaScript.
- Unique canonical URLs, titles, descriptions and social metadata.
- BreadcrumbList, relevant Article/BlogPosting/DefinedTerm/CollectionPage schema, and FAQPage only when matching FAQs appear on the page. Schema is descriptive and does not promise a search rich result.
- Generated sitemap includes all 38 indexable HTML routes; checkout and 404 remain noindex. Dates are explicit editorial dates rather than the current build time.
- Preserved product overview plus generated library at `/llms.txt` and `/llms-full.txt`.
- Markdown versions of all 34 new pages under `/content/`, linked from HTML; these secondary representations are excluded from indexing via `_headers`.
- `/resources/content.json` includes canonical URLs, Markdown URLs and the complete structured page content.
- `/blog/rss.xml` lists all five blog articles.

To add a page, create a ContentPage in its category module, link it from relevant existing content and run the checks. Hubs, sitemap, Markdown, JSON, llms exports and RSS automatically follow the registry. Use explicit publication dates and update `contentDate` when the editorial content changes. Check the action matrix against the product record before changing provider claims.

## Validate and preview

`npm run check:content` builds the site and uses Python 3's standard library to check static titles, metadata, structured JSON, every internal link/fragment, sitemap coverage, reachability, text exports and RSS. If `.qa/home-before.html` exists, the same check compares the landing main content with the pre-change build, ignoring only Astro scope attributes.

`npm run preview -- --host 127.0.0.1` serves the production build. Navigation and editorial pages need no API for preview. Existing launch-list submission continues to use the original Worker endpoint; no test signups are created as part of content validation.

The source changes do not submit URLs to a search engine or guarantee indexing. Production deployment and Search Console submission are separate actions. The existing main branch has automatic Cloudflare deployment, so publishing a commit there changes the live site.

## Verification — October 23, 2026

- Production build: 40 HTML pages (34 new), with 38 indexable URLs, 34 Markdown representations and five RSS articles.
- Static checks: all internal links and section fragments resolve; canonical/social metadata, JSON-LD, sitemap coverage, reachability, Markdown/JSON/full-text exports and RSS pass.
- Landing preservation: parsed main-body output matches the pre-change production build. Checksums match for the landing component, demo, pricing, waitlist, shared design stylesheet, product facts and home route.
- Browser checks: seven representative hub/detail/table/article layouts at 320, 390, 768, 1040 and 1440 pixels (35 combinations), with no horizontal page overflow. Mobile and desktop menu opening/closing, Escape, detail navigation and native FAQ expansion were exercised. Tables scroll within their own region on narrow screens. No browser warnings/errors were recorded in the tested flow.
- HTTP checks: 79 successful local responses across HTML and discovery formats; an unknown route returns 404. This checks the local production build, not a production deployment or search-engine indexing.
- No app files, payment configuration, availability flags, agent implementation or Worker implementation were changed. No live signup or payment was submitted.

Local proof artifacts are in ignored `.qa/`: the pre-change home build, preserved-file checksums, browser results and `resources-desktop.png`. They are not required to deploy the website.

## Motion refinement — October 23, 2026

The motion pass changes navigation and new editorial pages only. The landing component, its existing animations and shared design tokens remain unchanged.

- Menus: 240 ms entrance with a 6 px move and subtle scale; 160 ms exit. Both directions continue from the currently rendered frame when interrupted. The easing decelerates without a bounce.
- Editorial FAQs: 280 ms expansion and 160 ms collapse. Content height returns to its natural size afterward, including fractional pixels. Answers remain native details content without JavaScript.
- Cards: soft surface/border feedback and a 2 px directional arrow response. The clickable card stays stationary so the hit target does not move.
- Pages: a 240 ms entrance from 88% to full opacity, with the navigation outside the animation. Standard document navigation stays immediately interactive; no transition overlay or outbound wait is added.
- Reduced motion: the entrance and hover movement are disabled, and disclosure actions settle immediately. Changing the preference during an active animation also settles it.
- Focus: closing menu content immediately becomes inert; Escape returns focus to its trigger. Arrow keys/Home/End navigate menu links. Tab preserves the document's natural order and closes the menu on exit.

`src/scripts/disclosure.ts` owns animation cancellation and state. `npm run check:motion` tests rapid reversals, a stale animation completion racing a newer action, focus recovery, live reduced-motion changes and missing animation support. Those tests exercise state contracts; appearance and actual link navigation are checked separately in the browser.

Browser review for this pass checked rapid menu switching, ArrowDown/End/Tab/Escape focus flow, repeated FAQ toggles, natural answer height after completion, and first-click category/article navigation. Mobile checks at 390 px covered opening the menu and following a guide link, with no horizontal overflow. The final checked flow recorded no console warnings/errors. Review artifacts are saved in ignored `.qa/`.
