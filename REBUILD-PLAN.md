# Quiet Machines: builder storefront rebuild

Research date: October 9, 2026. Scope: research and an implementation-ready plan for the homepage, with coordinated product and purchase pages. No production page changes in this phase.

## Recommendation

Make Quiet Machines a small shelf of tools for people who build software. The core proposition is: **You could build this. Or get back to your project.** Offer two clear purchases for each product: the working app, or the app plus editable source. Both are one-time purchases with lifetime use.

The audience is independent developers and small software teams using Macs and coding agents. Speak to recognizable work: dictating a bug report, explaining a feature to an agent, checking blocked sessions, keeping small notes at the screen edge, and modifying a tool to fit a workflow. Avoid broad productivity promises.

Keep the confidence and irreverence, but give it a light visual treatment. The attitude belongs in a few memorable sentences; the product, demo, price, and source package should do most of the selling.

## Evidence and limits

This is primary-source desk research plus a source-code audit of this website and read-only inspection of the local Wisp and Perch projects supplied by the user. It is not customer interviews, a usability study, or evidence that a particular design will improve conversion. Competitor information describes what their pages currently claim, not independently tested app behavior. Visual recommendations below are proposed design decisions, not a screenshot audit of those sites.

| Reference | Observed positioning or behavior | Implication for this page |
| --- | --- | --- |
| [Handy](https://handy.computer/) | Free, open-source, local speech-to-text; the page demonstrates shortcut → speech → insertion. | The alternative to Wisp includes a free working app, not just a costly DIY project. Show why this particular implementation is useful. |
| [VoiceInk](https://tryvoiceink.com/) | Local dictation, public source, lifetime purchases; its Solo offer is currently $25 for one Mac. | Neither local processing nor lifetime pricing is unique. Wisp can offer an inexpensive, focused implementation with a useful source package, but cannot claim exclusive ownership or privacy benefits. |
| [Wispr Flow pricing](https://wisprflow.ai/pricing) | Free and Pro offerings, subscription billing, and a calculator relating typing time to potential savings. | Time is a familiar value argument. Use understandable build estimates rather than an elaborate calculator whose assumptions visitors cannot inspect. |
| [TypingMind](https://www.typingmind.com/) | Leads with the product category, ownership, and bringing your own API keys. | Explain the tool first. Put ownership close to the buying decision. Distinguish the app purchase from external model costs. |
| [TypingMind self-host source license](https://github.com/TypingMind/typingmind/blob/main/LICENSE.md) | The repository describes compiled code for self-hosting. | “Source included” needs a concrete definition. Quiet Machines should specify editable project files, build instructions, and permitted modifications rather than using self-hosting as a substitute for source access. |
| [Conductor](https://www.conductor.build/) | Demonstrates agent workspaces and currently promotes cloud agents, collaboration, and use of existing agent subscriptions or keys. | “All your agents in one place” is crowded positioning. Perch should demonstrate its narrower job: noticing agent activity at the screen edge and opening the relevant session. Replies happen in the provider app. |
| [CleanShot pricing](https://cleanshot.com/pricing) | Separates perpetual app use from its included update period. | “Lifetime” does not explain updates, support, or device limits. Put those answers within reach of the purchase. Do not import a renewal model into this offer. |
| [Nielsen Norman Group: web reading](https://www.nngroup.com/articles/how-users-read-on-the-web/) | Its foundational research favors scanning, meaningful subheadings, concise copy, and objective claims. | Use explicit product labels, short paragraphs, and visible comparison rows. This older study is directional usability evidence, not a conversion forecast for indie developers. |

The important competitive conclusion: sell a useful finished implementation and a head start on customization. Do not frame DIY as the only alternative, or suggest every visitor must spend the supplied time and token amounts.

## Product evidence from the supplied folders

Inspected `/Users/rohitgawli/Documents/ChatGPT/Wisp/` and `/Users/rohitgawli/Documents/ChatGPT/Charms/` read-only. Charms contains the current Perch project. No builds, launches, hook installations, asset exports, or edits were performed there. Product facts below come from the READMEs, package manifests, brand code, provider definitions, and Perch's recorded verification; they are not newly executed runtime tests.

### Wisp

- Native SwiftUI + AppKit, Apple silicon, macOS 26+, English; Apple's on-device SpeechAnalyzer; no external package dependencies.
- Notch interface with live transcription. Toggle dictation inserts on pauses and keeps listening; holding the shortcut gives push-to-talk. The default shortcut is Control–Option–Space.
- Approximately 270 built-in technical names/acronyms, a personal dictionary, snippets, rule-based cleanup, number formatting, and guarded “scratch that” removal. These give the developer positioning concrete substance.
- Clipboard-restoring insertion, review-first/copy-only modes, local history and usage counts. Microphone permission is needed; insertion needs Accessibility permission. Apple may download its speech model during setup.
- Still documented as development alpha. Cross-app insertion needs compatibility testing. Experimental self-correction must not become a broad promise of AI rewriting or voice editing.

### Perch

- Native SwiftUI + AppKit utility for macOS 14+, with a small screen-edge tab, agent rail, and separate sticky notes. No Wisp dependency, external packages, account, server, or network requests in the documented app.
- Shows Needs you, Working, and Recent sessions from local provider hooks. Opens the provider/session where supported, copies resume commands, hides sessions until they change, and allows local session names.
- **Does not reply to agents, approve tools, or make decisions.** The existing website's reply demo and the initial plan's in-inbox answering proposition are inaccurate and must be replaced.
- Implemented adapters: Claude Code, Cursor, Codex. The verification document records live Claude Code CLI and Cursor local Agent checks. Live Codex coverage remains unverified; Cursor's passive hooks do not expose awaiting-permission status. OpenCode is not an implemented provider in this source.
- Notes support pinning, colors, and local persistence, with up to ten notes of 1,000 characters each. Show notes as a supporting benefit alongside the primary agent-status story.
- Distribution signing/notarization and other release checks remain outstanding in the recorded verification. Do not describe the local build as a finished public release.

### Assets to use in the rebuild

- Wisp's existing icon: `Wisp/Resources/AppIcon.png` and `.icns`; canonical drawing in `Wisp/Sources/Wisp/Brand.swift`. Visually inspected: violet tile, luminous voice bars, rising wisp. Preserve this identity.
- Perch's canonical icon drawing: `Charms/app-src/Perch/PerchIcon.swift`; existing bundled icon: `Charms/dist/Perch.app/Contents/Resources/Perch.icns`. The code defines warm paper with a black edge tab and amber light. Avoid the older Charms bundle icon.
- Perch reference captures: `Charms/docs/images/perch-agents.png`, `perch-agent-needs-you.png`, `perch-tab.png`, `perch-tab-hover.png`, `perch-notes.png`, `perch-note.png`, and setup/settings images. Visually inspected the agent shelf and notes captures. Treat their agent content as sample activity; add an explicit website caption because the inspected images do not visibly establish live verification.
- Keep every original untouched. During implementation, copy needed assets into the website workspace and perform optimization or format conversion only on those copies. Do not invoke source-project export/build scripts. Any Wisp UI reconstruction must be labeled illustrative until an authentic capture is available.

## Current-site audit

- `src/pages/index.astro` opens with broad busywork messaging. Wisp examples center on meetings and budgets instead of developer work. The homepage offers no source-code tier or build-versus-buy comparison.
- `src/styles/store.css` defines a light palette and then overrides it with charcoal, acid yellow, heavy uppercase headings, and square buttons. The homepage also has accumulated style overrides. Replace these rules coherently rather than appending another theme layer.
- `src/data/store.ts` has one price per product. Wisp is labeled development alpha; Perch is in development. These are the current repository claims, not a fresh verification of release readiness.
- `src/components/store/Preview.astro` provides useful lightweight concept demos. They are illustrative, not recordings of released apps. Reuse their interaction model with developer-specific examples and explicit labels.
- `src/components/ProductPage.astro` repeats a single planned-price offer. Its pricing and copy must be updated with the homepage so buyers see consistent information.
- `src/pages/checkout/[product].astro` supports one configured payment link per product. It does not deliver licenses or source archives. Four distinct offers need variant-aware order pages and fulfillment.
- The existing Astro approach is suitable: static content, a local font, and small scripts. A framework migration is unnecessary.

## Offer and pricing

All amounts below are USD. Source prices are total package prices, not add-on charges. Proposed package assumption: the source purchase also includes the ready-to-use app.

| Product | Build a similar tool yourself | Get the app | App + full source |
| --- | --- | --- | --- |
| Wisp | About 3 days + $120 in AI tokens | $9 once | $19 once |
| Perch | About 4–5 days + $270 in AI tokens | $39 once | $69 once |

The time and token figures come from the brief. They have not been independently measured. Initially label them **rough build-from-scratch estimates** and add a short note that time and spend vary with scope, models, experience, and iteration. If actual build logs substantiate them, stronger first-person wording becomes possible: “My build took…” Do not present an estimate as a receipt, guaranteed saving, crossed-out retail price, or benchmark against every free alternative.

Spell out “$120 in AI tokens,” rather than “$120 tokens.” Keep the comparison static: no hourly salary assumption, inflated savings percentage, fake sale, or monthly/annual switch.

Lifetime means a non-expiring right to use the purchased app and the source package under its stated terms. The final update and support promises remain a product decision. Do not silently promise unlimited future development or introduce a recurring fee.

## Proposed page sequence and copy

### 1. A small, useful navigation

Quiet Machines wordmark; links to Tools, Source code, and FAQ. A quiet “Meet Riley” footer link. Primary header action: “Explore the tools.” On mobile, keep direct access to the two products without a large navigation component.

### 2. Hero: identify the buyer and the tradeoff immediately

Eyebrow: **Small Mac tools for indie builders.**

Headline: **You could build this.\nOr get back to your project.**

Supporting copy: “Wisp turns spoken thoughts into text. Perch keeps agent status and sticky notes at your screen edge. Buy the app, or get the source and make it yours.”

Actions: **Explore the tools** and **Compare build vs. buy**. Both scroll to useful content, rather than asking for an email.

Small line: “Wisp from $9 · Perch from $39 · Pay once. Use for life.” During development, explicitly label these planned prices near that line.

Use a compact two-product preview or summary immediately below the hero. The hero should not fill a whole desktop screen before visitors learn what the products do.

### 3. Wisp: a full-width product section

Headline: **Talk through the next thing you’re building.**

Body: “Prompts, bug reports, implementation notes. Say the thought while it’s fresh.” Follow with continuous pause-to-insert dictation, built-in technical vocabulary, and the personal dictionary. Keep privacy and compatibility details concrete.

Demo scenario: a spoken bug report becomes a text description in an editor. Example: “The settings panel closes when I hit Escape, but focus doesn’t return to the button.” Show transcription rather than implying Wisp generates code or invents a solution. Use dictionary behavior for technical vocabulary only when verified.

Below the demo, show three parallel choices:

- **Build it yourself:** ~3 days + ~$120 in AI tokens. A small “What’s involved?” disclosure can outline capture, transcription, insertion, permissions, settings, and testing. This is an estimate, not a checkout option.
- **Get Wisp — $9:** ready-to-use app, lifetime use.
- **Wisp + source — $19:** app plus the complete editable project and instructions to build it.

Keep Apple silicon, macOS 26+, English, and the current release status visible. Those requirements are from current site data and should be checked against the release before launch.

### 4. Perch: a second full-width product section

Headline: **Know which agent needs you. Right at the edge of your screen.**

Body: “See what’s working, what’s finished, and what needs your attention. Jump back into the session. Keep a few notes within reach.”

Demo scenario: the edge tab indicates agent activity; clicking opens the shelf grouped into Needs you, Working, and Recent; selecting a session returns the user to its provider. Include a secondary view of pinned notes. Show status in text, not color alone. There must be no inline reply or approval control. Clearly distinguish recorded live verification for Claude Code CLI and Cursor local Agent from the implemented but live-unverified Codex adapter. Do not show OpenCode as supported, or Cursor as exposing permission-waiting events.

Choices mirror Wisp exactly:

- **Build it yourself:** ~4–5 days + ~$270 in AI tokens.
- **Get Perch — $39:** ready-to-use app, lifetime use.
- **Perch + source — $69:** app plus the editable project and build instructions.

Small note: “Your coding-agent plans and API usage stay separate.” Remove the existing free-tier claim from the new offer unless it is intentionally retained; the brief specifies the two paid options.

### 5. Source: show what the buyer receives

Headline: **Have a different idea? Start with the source.**

Explain the deliverable in concrete terms: the full application project, dependency information, setup instructions, build commands, and a license that explains modification rights. These are package requirements to fulfill, not claims that those assets have already been inspected.

Show a real, compact project-tree excerpt and a short setup excerpt using the inspected projects. Both use SwiftUI + AppKit and have no external package dependencies. Wisp separates `Sources/Wisp` and `Sources/WispCore`; Perch separates `app-src/Perch`, `PerchCore`, and `PerchHook`. Both include build/test scripts. Explain signing and permission setup in package documentation; do not promise a verified one-command setup or a successful build time. Final licensed distribution packages still need preparation.

Explain likely customizations, subject to the actual code: change Wisp’s shortcuts and UI; adapt Perch’s inbox and add an integration. Link to a package-content and license summary. “Build on top of it” must state whether commercial derivatives, redistribution, and resale are permitted. Do not casually label a paid source package “open source.”

### 6. A short note from Riley

“I build tools I want on my own Mac. If one saves you a few days, buy it. If you want to take it somewhere else, get the source. Either way, you pay once.”

Optional closing line with the requested attitude: **“Useful little tools. Zero interest in MRR.”**

Keep this to a brief signed note. A large founder portrait and long manifesto would interrupt the comparison visitors came to make. A small authentic portrait can live beside the signature.

### 7. FAQ and a compact final purchase summary

Answer: What does lifetime include? Does source include the app? Can I modify it commercially? Can I redistribute it? What updates are included? Which Macs work? Which agents work? Does anything leave my Mac? Are there separate API charges? What happens after payment? What is the refund policy?

Publish answers only where established. Repeat the two products and four prices at the bottom with explicit actions, not a generic newsletter pitch.

## Light, airy visual direction

Proposed palette: warm off-white background `#FAFAF7`, white surfaces, near-black text `#202923`, muted text `#5F685F`, pale borders `#E1E6DE`, and dark green actions `#315843`. Use a pale lavender Wisp surround reflecting its violet icon, and warm paper/soft amber accents for Perch reflecting its actual identity. Preserve the dark native app UI within the light page. Validate contrast in the implementation; pale accents are for backgrounds, not small text.

- Keep the existing local Inter Tight font; use sentence case, normal-width body text, and moderate weights. Monospace is an accent for prices, shortcut keys, and small technical details.
- Use roughly 1120px maximum content width, 80–104px desktop section spacing, 40–56px mobile spacing, and 18–20px body copy where appropriate.
- Product sections get generous space and a large demo. Each comparison sits directly beneath its product instead of making six unrelated cards compete at once.
- Use 12–16px corner radii, thin borders, and subtle shadows around app windows. Avoid decorative motion, tilted stickers, all-caps billboards, or a wall of badges.
- On small screens, stack title, explanation, demo, and comparison in that order. Show both purchase options directly; do not hide source pricing behind a toggle.
- Keep interactions keyboard accessible, focus obvious, targets at least 44px, and reduced-motion support. Keep functional content available without JavaScript.

## Implementation sequence

1. **Unify the offer data.** Extend `src/data/store.ts` with build estimates, app and source variants, package contents, release state, and explicit availability per variant. Preserve existing product routes. Remove copy contradictions before adding new claims.
2. **Replace the shared visual foundation.** Consolidate `src/styles/store.css`; update `src/layouts/Store.astro` navigation, theme color, metadata, and social description. Remove the dark override layer and update affected product/order styles together.
3. **Build reusable product and comparison components.** Separate the product demonstration from the pricing comparison so homepage and product detail pages can share the same offer data without duplicating prices.
4. **Rebuild the homepage.** Implement the sequence above in `src/pages/index.astro`, including source-package explanation, compact maker note, and FAQ. Update `Preview.astro` examples to match actual developer workflows. Replace Perch's fabricated reply interaction and unsupported provider with its actual edge shelf, session-opening behavior, and notes. Use copies of the supplied brand assets.
5. **Align detail and order pages.** Update `ProductPage.astro`. Preserve `/checkout/wisp` and `/checkout/perch` for app purchases; add explicit source routes such as `/checkout/wisp/source` and `/checkout/perch/source`. Give each order page an unambiguous product, variant, price, and deliverable summary.
6. **Connect fulfillment when ready.** Use four distinct one-time offers. Map payment success to the correct app license/download and source package. A payment link alone does not implement delivery. Do not place paid source archives in the public website directory.
7. **Verify and review.** Run the production build; inspect homepage, both product pages, and all offer pages at 360px, 390px, 768px, and 1440px. Check keyboard navigation, contrast, overflow, demo state changes, variant totals, unavailable states, metadata, and real purchase/delivery behavior in a test environment.

## Availability and decisions that affect launch

The plan can be designed and implemented using the supplied prices now. Current repository status still says alpha/development. Show the actual status and planned prices until the apps and source packages are deliverable. A “Buy” button must lead to a real matching purchase; if unavailable, label the action “Request access” or “Ask about source” and explain that it opens email.

Before live selling, establish whether the build figures are estimates or logged actuals; source modification and distribution rights; app/device limits; update and support scope; refund policy; and verified Perch integrations. These decisions should not block the layout prototype, but they determine the final published promises.

## Acceptance criteria

- Within the hero and first product section, a builder can identify the audience, product behavior, one-time model, and source option.
- Exact offers appear consistently: Wisp $9/$19; Perch $39/$69. No subscription toggle, recurring product charge, or invented discount.
- DIY time and token amounts are clearly approximate and attributed to supplied estimates unless supported by build logs.
- Source is a first-class purchase with a stated package and meaningful modification rights, not a vague premium badge.
- Mobile users can compare both tiers without opening an accordion or scrolling a horizontal pricing table.
- The page remains light, readable, responsive, and usable without animation. Concept previews are labeled honestly.
- All CTAs match release availability; all live purchases map to the correct deliverable.
- Judge the result by completed app/source purchases and useful customer feedback. If instrumentation is added, track offer selection and successful delivery; MRR is irrelevant to this model.
