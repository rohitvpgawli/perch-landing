import { site } from './site';
import { productHref, type ProductSlug } from './hosts';

export const products = {
  wisp: {
    name: 'Wisp', status: 'Development alpha', price: 9, sourcePrice: 19,
    appAvailable: false, sourceAvailable: false, buildDays: '3 days', buildCost: 120,
    category: 'On-device dictation for Mac', short: 'Think out loud. Keep building.',
    description: 'Prompts, bug reports, the idea you haven’t quite worked out. Speak naturally. Wisp puts your words at your cursor, one pause at a time.',
    requirements: 'Apple silicon · macOS 26+ · English',
    included: ['Native Mac app', 'Continuous and push-to-talk dictation', 'Technical vocabulary, dictionary & snippets', 'Local history and usage insights'],
    features: [
      { title: 'A pause, not a full stop.', body: 'Pause to insert a sentence. Wisp keeps listening while you think, so your next thought doesn’t need another shortcut.', icon: '↳' },
      { title: 'It speaks developer.', body: 'Around 270 built-in technical names and acronyms. GitHub, Kubernetes, Next.js. Add your own project names to the dictionary.', icon: '</>' },
      { title: 'Your words stay local.', body: 'Apple’s on-device speech models do the transcription. No audio uploads, account, or dictation API bill.', icon: '⌂' },
      { title: 'Less “um.” Same idea.', body: 'Simple rules remove fillers and repeated words, and format numbers. Small cleanup that keeps what you meant.', icon: '✧' },
      { title: 'Your shortcut. Your rhythm.', body: 'Toggle for continuous dictation or hold to talk. Choose your microphone, shortcut, and pause length.', icon: '⌘' },
      { title: 'A little room to retrace.', body: 'Local history keeps your last 100 sessions. Use review-first or copy-only mode when you want the final say.', icon: '↶' },
    ],
    faq: [
      { q: 'Can I get Wisp today?', a: 'Wisp is in development alpha. You can request access from Riley. The planned lifetime prices are $9 for the app and $19 for the app plus full source. Purchases are not open yet.' },
      { q: 'Which Macs does it work on?', a: 'Wisp requires Apple silicon and macOS 26 or later. Dictation currently supports English. Apple may download its speech model during setup.' },
      { q: 'Where does my voice go?', a: 'Speech is processed on your Mac. Audio is discarded unless you enable troubleshooting recordings, which are off by default. History, your dictionary, and usage counts are stored locally. Wisp has no telemetry.' },
      { q: 'Will it work in my editor?', a: 'Wisp uses paste-based insertion in native, browser, and Electron apps. It needs Microphone permission and Accessibility permission for insertion. Secure fields are excluded, and compatibility testing is ongoing. Copy-only mode works without Accessibility permission.' },
      { q: 'Does it rewrite or generate code?', a: 'No. Wisp transcribes your speech and applies light, rule-based cleanup. It is not a coding agent. Experimental self-correction is separate from the standard dictation workflow.' },
    ],
  },
  perch: {
    name: 'Perch', status: 'In development', price: 39, sourcePrice: 69,
    appAvailable: false, sourceAvailable: false, buildDays: '4–5 days', buildCost: 270,
    category: 'Agent status & sticky notes for Mac', short: 'A little less agent babysitting.',
    description: 'Working, finished, or waiting on you. Keep agent activity at the edge of your screen, jump back into a session, and leave yourself a little note.',
    requirements: 'macOS 14+ · Native SwiftUI + AppKit',
    included: ['Native Mac app and screen-edge shelf', 'Local agent status and session shortcuts', 'Pinned sticky notes', 'Keyboard shortcuts and local storage'],
    features: [
      { title: 'A glance is enough.', body: 'A small edge tab keeps agent activity in view. Open the shelf to see Needs you, Working, and Recent sessions.', icon: '◉' },
      { title: 'Back to the right place.', body: 'Open the provider or supported session, copy a resume command, or hide a session until it changes. Answer in your agent’s own app.', icon: '↗' },
      { title: 'Keep that thought nearby.', body: 'Pin a note to your screen edge. Ten small notes, four colors, and a place for the detail you’ll need in a minute.', icon: '▤' },
      { title: 'Your machine. Your activity.', body: 'Events and notes stay local. Perch discards prompts, tool contents, and credentials, and makes no network requests.', icon: '⌂' },
      { title: 'A companion, not an agent.', body: 'Perch observes activity. It never approves a tool, sends an agent a reply, or makes a decision for you.', icon: '⌘' },
      { title: 'Connect on your terms.', body: 'Review the local hook changes before installing. Pause monitoring or remove a provider’s hooks in Settings.', icon: '↔' },
    ],
    faq: [
      { q: 'Which agents work with Perch?', a: 'The current build has adapters for Claude Code, Cursor, and Codex. Live Claude Code CLI and Cursor local Agent checks are recorded. Live Codex coverage is still being verified. Ordinary Claude chats and OpenCode are not supported.' },
      { q: 'Can I answer agents inside Perch?', a: 'No. Perch shows status and opens the provider or supported session. You reply and approve tools in the agent’s own app. Cursor’s passive hooks do not expose awaiting-permission status.' },
      { q: 'Does it open the exact conversation?', a: 'Supported Claude desktop Code sessions can open their conversation. Terminal sessions open their terminal host. Cursor opens the app rather than a specific chat. Codex deep links remain unverified live.' },
      { q: 'Does Perch need Wisp or an account?', a: 'Neither. Perch is an independent Mac app for macOS 14 and later. It has no account or server. Your coding-agent subscriptions and API costs remain separate.' },
      { q: 'Can I buy Perch yet?', a: 'Perch is in development. The planned lifetime prices are $39 for the app and $69 for the app plus source. Ask Riley about the current build; public distribution and source-package release are still being prepared.' },
    ],
  },
} as const;

export type ProductKey = keyof typeof products;
export type OfferVariant = 'app' | 'source';
export const productKeys: ProductKey[] = ['wisp', 'perch'];
export const sourceIncluded = ['Ready-to-use app included', 'Complete editable Swift project', 'Build scripts and setup instructions', 'A starting point for your own changes'];
export const ownershipFaq = [
  { q: 'What does lifetime mean?', a: 'One payment for a non-expiring license to use the purchased version. No subscription. Update coverage, device limits, support, and refund terms will be published before purchases open.' },
  { q: 'Does the source price include the app?', a: 'Yes. The planned $19 Wisp and $69 Perch packages include the app and its full editable source. Those are total prices, not add-on charges.' },
  { q: 'Can I build on top of the source?', a: 'That is the point of the source package: read it, modify it, and adapt it to your workflow. The license will spell out commercial use and redistribution rights before sales open; those rights are not promised yet.' },
  { q: 'Where do the build estimates come from?', a: 'They are Riley’s rough estimates for building similar tools from scratch, including AI token spend. Your time and costs will vary with scope, models, and experience. Free and open-source alternatives also exist.' },
];

/** Checkout path on the product’s own host (or /sites/{slug} in local path mode). */
export function offerPath(product: ProductKey, variant: OfferVariant = 'app') {
  return productHref(product as ProductSlug, variant === 'source' ? '/checkout/source' : '/checkout');
}

/** Public homepage for a sellable product. */
export function productPagePath(product: ProductKey) {
  return productHref(product as ProductSlug, '/');
}

export function contactLink(product: ProductKey, variant: OfferVariant = 'app') {
  return `mailto:${site.email}?subject=${encodeURIComponent(`${products[product].name} ${variant === 'source' ? 'source package' : 'access'}`)}`;
}
