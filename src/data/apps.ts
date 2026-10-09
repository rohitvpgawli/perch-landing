import type { GlyphName } from "../components/glyphs";

export type Slug = "wisp" | "perch" | "handle" | "sakana";

interface Shared {
  slug: Slug;
  name: string;
  /** Short line under the name on tiles and in the nav. */
  pitch: string;
  tag: string;
  accent: string;
  grad: [string, string];
}

export interface ReadyApp extends Shared {
  kind: "ready";
  tagline: string;
  status: string;
  cta: string;
  statement: string;
  intro: string;
  stats: { value: string; label: string }[];
  demoTitle: string;
  demoHint: string;
  features: { title: string; body: string; icon: GlyphName }[];
  steps: { title: string; body: string }[];
  privacy: { title: string; body: string };
  pricing: {
    headline: string;
    sub: string;
    plans: { name: string; price: string; period: string; note: string; items: string[]; featured?: boolean; cta: string }[];
    fine: string;
    /** Launch price for the first `spots` buyers. Update `claimed` from real sales; the offer ends when it reaches `spots`. */
    earlyBird?: { price: string; spots: number; claimed: number };
  };
  faq: { q: string; a: string }[];
  requirements: string;
}

export interface SoonApp extends Shared {
  kind: "soon";
  tease: string;
  hint: string;
  eta: string;
  /** A handful of carefully vague lines shown one at a time on the teaser page. */
  whispers: string[];
}

export type App = ReadyApp | SoonApp;

export const apps: App[] = [
  {
    kind: "ready",
    slug: "wisp",
    name: "Wisp",
    pitch: "Say it. It's typed.",
    tagline: "Dictation that stays on your Mac.",
    status: "Available now",
    tag: "New",
    cta: "Download for Mac",
    accent: "#0a84ff",
    grad: ["#0a84ff", "#5ac8fa"],
    statement:
      "Hold a key. Say the thing. Let go. Apple's on-device dictation hears it, Apple Intelligence cleans it up, and finished text lands in whichever app you were already in. All of it on your Mac's own chip. Nothing you say ever leaves it.",
    intro: "Hold a key, talk, let go. Finished text lands in any app, four times faster than typing. Powered by Apple's on-device models, so it never leaves your Mac.",
    stats: [
      { value: "4×", label: "faster than typing" },
      { value: "0.7s", label: "from release to text" },
      { value: "100%", label: "on-device, on Apple's models" },
      { value: "0", label: "bytes leave your Mac" },
    ],
    demoTitle: "Try it right here.",
    demoHint: "Hold the button (or the space bar) and let Wisp \u201clisten\u201d. Let go, and watch the cleanup.",
    features: [
      { icon: "wand", title: "Finished text, not a transcript.", body: "Fillers gone, numbers written right, \u201cscratch that\u201d honoured. Apple Intelligence does it on your Mac before the text lands." },
      { icon: "apps", title: "Types into every app.", body: "Slack, Mail, Messages, Notion, Cursor, the Terminal. Chrome and Electron included." },
      { icon: "tone", title: "Matches the room.", body: "Casual in Messages, professional in Mail, your exact words in the Terminal. Set your own rule per app." },
      { icon: "book", title: "Learns your words.", body: "Names, products, jargon. Correct a word twice and Wisp asks whether to remember it. Nothing is learned without a yes." },
      { icon: "globe", title: "Speaks your languages.", body: "Every language your Mac can dictate in, on Apple's own speech models. Wisp hears which one you're using and switches for you." },
      { icon: "terminal", title: "Talks to your agents.", body: "Say what you want built. The brief lands in Claude Code, Codex or Cursor as a clean paragraph, ready to send." },
      { icon: "lock", title: "No account. No cloud. No tracking.", body: "Turn Wi-Fi off and every part still works. Open a network monitor and dictate all day. Nothing shows up, because nothing is sent." },
    ],
    steps: [
      { title: "Hold.", body: "Press and hold the fn key, or whichever key you choose. A small pill appears under the notch." },
      { title: "Talk.", body: "Say it the way you'd say it to a person. Ums, false starts, \u201cactually, make that Thursday\u201d. All fine." },
      { title: "Let go.", body: "Seven tenths of a second later, finished text is sitting in whatever field your cursor was in." },
    ],
    privacy: {
      title: "Nothing leaves your Mac. And you can check.",
      body: "Wisp listens with Apple's on-device dictation models and thinks with Apple Intelligence, both running on your Mac's own chip. No account, no analytics, no tracking, no server of ours. The only request Wisp ever makes is a check for updates, and you can turn that off.",
    },
    pricing: {
      headline: "Pay once. Keep it forever.",
      sub: "Seven days free, no card. Then one payment, for life, on up to two Macs.",
      plans: [
        {
          name: "Wisp Lifetime",
          price: "$9",
          period: "once",
          note: "Every feature and every future version. Nothing to renew, ever.",
          items: ["Every feature, every language", "Updates for life", "Up to 2 Macs", "100% on-device, nothing tracked", "Move it to a new Mac any time"],
          featured: true,
          cta: "Get Wisp for $9",
        },
      ],
      fine: "Prices in USD. macOS 26 or later with Apple Intelligence. No subscriptions, ever. 30-day refund, no questions.",
    },
    faq: [
      { q: "Does it work offline?", a: "Completely. Wisp runs on Apple's speech and Apple Intelligence models, which macOS keeps on your Mac. Its only network request is a check for updates, and you can turn that off." },
      {
        q: "Which AI does it use?",
        a: "Apple's own. Speech is transcribed by the dictation models built into macOS, and cleanup runs on the on-device model at the core of Apple Intelligence. Wisp never calls a cloud model, not ours, not anyone's.",
      },
      { q: "Do I need an account?", a: "No. You buy a key, and there is nothing to sign in to. Wisp never asks who you are." },
      { q: "Does it work in every app?", a: "Yes, including Chrome and Electron apps like Slack and VS Code, which most dictation tools struggle with." },
      { q: "Why is it better at times and numbers?", a: "Because it doesn't ask a model. Anything with one correct answer, like a clock time or a spoken comma, is handled by a fixed rule that can't drift." },
      { q: "Is my voice used to train anything?", a: "No. Your audio never leaves your Mac, so there is nothing to train on." },
      { q: "What if I don't like it?", a: "Use it free for seven days first. After that, a 30-day refund, no questions." },
    ],
    requirements: "Requires macOS 26 Tahoe or later on a Mac with Apple silicon, with Apple Intelligence turned on.",
  },
  {
    kind: "ready",
    slug: "perch",
    name: "Perch",
    pitch: "Every agent. One place.",
    tagline: "Your coding agents, waiting on no one.",
    status: "Available now",
    tag: "New",
    cta: "Download for Mac",
    accent: "#30d158",
    grad: ["#30d158", "#00c7be"],
    statement:
      "Claude Code is waiting for a yes in one window. Codex finished an hour ago in another. Perch gathers every question and every finished job into one inbox, so you answer in a keystroke and nothing sits idle.",
    intro: "One inbox for everything your coding agents ask and finish, on your Mac, your iPhone and your servers.",
    stats: [
      { value: "1", label: "inbox for every agent" },
      { value: "1", label: "keystroke to answer" },
      { value: "2s", label: "to take an answer back" },
      { value: "8", label: "servers, end-to-end encrypted" },
    ],
    demoTitle: "Answer three agents without leaving this page.",
    demoHint: "Cards arrive as agents need you. Press 1, 2 or 3, or click. Escape takes an answer back.",
    features: [
      { icon: "inbox", title: "The Inbox.", body: "Every agent's questions and finished work, in one list. Press 1, 2 or 3 and the agent has its answer." },
      { icon: "dots", title: "The Toolbar.", body: "A dot for every agent at the edge of your screen. Blue is working, amber needs you, green is done." },
      { icon: "route", title: "The Router.", body: "Double-tap Option and say what you need, or type it. Apple Intelligence works out which agent is on it, right on your Mac, and Perch hands it over." },
      { icon: "phone", title: "On your iPhone.", body: "A notification when an agent asks or finishes. Answer from the same Inbox, wherever you are." },
      { icon: "server", title: "On your servers.", body: "Paste one command on a Linux box and its agents join the same Inbox. End-to-end encrypted, no open port." },
      { icon: "undo", title: "Take it back.", body: "Every answer waits two seconds before it sends. Press Escape and it never happened." },
      { icon: "keyboard", title: "Keyboard first.", body: "J and K move between cards. E clears one. Return sends the suggested next step." },
    ],
    steps: [
      { title: "Open Perch.", body: "Claude Code, Codex, OpenCode and the rest connect on their own. No config files." },
      { title: "Connect your machines.", body: "Scan a code with your iPhone, or paste one command on a server. Each one joins the same Inbox." },
      { title: "Answer.", body: "Reply in the Inbox, or say what you need. Perch sends it to the right agent and tells you when it's done." },
    ],
    privacy: {
      title: "Perch does what you asked. Then it stops.",
      body: "Perch thinks with Apple Intelligence on your Mac, acts only when you ask, and shows a receipt. No account, no analytics, no tracking, no server of ours. Your Mac, iPhone and servers talk to each other directly, end-to-end encrypted, and to no one else.",
    },
    pricing: {
      headline: "Start free. Stay for one payment.",
      sub: "Your coding agents stay on the plans you already have. Perch is just the inbox.",
      plans: [
        {
          name: "Free",
          price: "$0",
          period: "forever",
          note: "The Inbox, the Toolbar, and 25 routed requests a day.",
          items: ["Every agent on your Mac", "Inbox and Toolbar", "25 routed requests a day", "iPhone app"],
          cta: "Download for Mac",
        },
        {
          name: "Lifetime",
          price: "$39",
          period: "once",
          note: "Unlimited routing, up to 8 servers and every future update. Pay once, keep it forever.",
          items: ["Everything in Free", "Unlimited routed requests", "Up to 8 servers", "Voice router", "Priority answers from a person", "Updates for life"],
          featured: true,
          cta: "Buy Lifetime for $39",
        },
      ],
      fine: "Prices in USD. macOS 26 or later with Apple Intelligence. No subscriptions, ever. Full refund within 3 days of any purchase.",
    },
    faq: [
      { q: "Is Perch another coding agent?", a: "No. The agents you already run write the code. Perch shows their status, collects their questions and passes them your answers." },
      { q: "Does it act on my agents by itself?", a: "No. Perch acts when you send a request or answer in the Inbox. It does the thing, shows a receipt, and stops." },
      { q: "Which agents does it work with?", a: "Claude Code, Codex, OpenCode, Amp, Gemini CLI and anything else that runs in a terminal. More arrive with each update." },
      { q: "Does it work when my Mac is asleep?", a: "Agents on your Mac need the Mac awake. Agents on a connected server stay reachable from your phone even when your Mac is off." },
      {
        q: "What does Perch send, and where?",
        a: "Nothing to us, because there is no us in the loop. Your answers go straight to the agent on your own machine. Your Mac, iPhone and servers sync directly, end-to-end encrypted. iPhone alerts travel through Apple's push service, encrypted so only your phone can read them. Perch keeps no copy of your code and tracks nothing.",
      },
      { q: "What about the agents themselves?", a: "Claude Code, Codex and the rest talk to their own providers exactly as they do today. Perch doesn't add anything to that, and doesn't see anything new." },
    ],
    requirements: "Requires macOS 26 Tahoe or later on a Mac with Apple silicon, with Apple Intelligence turned on. iPhone app requires iOS 17 or later.",
  },
  {
    kind: "soon",
    slug: "handle",
    name: "Handle",
    pitch: "Get a grip on it.",
    tag: "Coming soon",
    accent: "#ff9f0a",
    grad: ["#ff9f0a", "#ff375f"],
    tease: "Some things you were always meaning to get to.",
    hint: "A third app. Still under wraps. We'll say more when it's ready to be held.",
    eta: "Early 2027",
    whispers: ["It's about the things you keep putting off.", "It fits in one hand.", "It knows when you've had enough for today.", "We've been using it every morning for a year."],
  },
  {
    kind: "soon",
    slug: "sakana",
    name: "Sakana",
    pitch: "Something is moving under the surface.",
    tag: "Coming soon",
    accent: "#5e5ce6",
    grad: ["#5e5ce6", "#64d2ff"],
    tease: "Something is moving under the surface.",
    hint: "The fourth app. The one we're most excited about, and the one we'll say the least about.",
    eta: "2027",
    whispers: ["魚 means fish.", "It goes where you go.", "It never asks you to start over.", "It's quieter than you'd think."],
  },
];

export const ready = apps.filter((a): a is ReadyApp => a.kind === "ready");
export const soon = apps.filter((a): a is SoonApp => a.kind === "soon");
export const getApp = (slug: string) => apps.find((a) => a.slug === slug);

/** The live early-bird offer for an app, or null once every spot is claimed. */
export const earlyBird = (app: ReadyApp) => {
  const e = app.pricing.earlyBird;
  if (!e || e.claimed >= e.spots) return null;
  return { ...e, regular: app.pricing.plans[0].price, left: e.spots - e.claimed, pct: Math.round((e.claimed / e.spots) * 100) };
};
