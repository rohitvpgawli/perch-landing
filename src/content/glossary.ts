import type { ContentPage } from './types';
export const terms: ContentPage[] = [
  {
    category: 'glossary', slug: 'agent-hook', title: 'What is an agent hook?',
    description: 'An agent hook is an event-triggered integration point. Learn how Perch uses local hooks to receive activity without reading your terminal screen.',
    lead: 'An agent hook is an integration point that runs when a coding agent emits a particular event. Perch uses local hooks to receive supported activity updates.',
    sections: [
      { title: 'An event instead of a screen scan', paragraphs: ['A hook can report that a session started, a tool ran or a turn finished. Perch turns supported events into session state and recent steps. It does not need to read the terminal display to learn that an event occurred.', 'The provider decides which events exist and what each hook can do. Cursor’s passive hooks do not expose awaiting-permission status, for example. A hook integration cannot reliably show an event it never receives.'] },
      { title: 'How Perch connects hooks', paragraphs: ['Perch shows the proposed agent settings change before connecting, makes a backup and adds its own entries. Remove takes those entries out. Start a new session after connecting so the integration can take effect.'], links: [{ label: 'Connect your first session', href: '/guides/getting-started/' }] },
    ], related: ['/guides/agent-status-not-updating/', '/guides/agent-compatibility/'],
  },
  {
    category: 'glossary', slug: 'agent-session', title: 'What is a coding-agent session?',
    description: 'A coding-agent session is a particular ongoing interaction with an agent. Understand sessions, turns and Perch’s working, waiting and recent states.',
    lead: 'A coding-agent session is a particular ongoing interaction with an agent, associated with its own task and project context. A turn is one period of work within that session.',
    sections: [
      { title: 'One provider can have several sessions', paragraphs: ['Two Claude Code terminals may belong to the same provider but different projects. Treat them as separate sessions when reviewing a request. Perch uses session identifiers and project context to keep their activity distinct.', 'A turn ending does not necessarily end the whole session. A reply can become its next instruction, and the same session may return to Working.'] },
      { title: 'What a state tells you', paragraphs: ['Perch groups supported activity into Needs you, Working and Recent. A completed turn means the agent stopped that turn; it is not proof that the implementation is correct.', 'Use the state to decide where to look, then open the project or agent when you need the full output. Perch’s recent steps are status summaries rather than retained transcripts.'] },
    ], related: ['/use-cases/parallel-agents/', '/blog/monitor-multiple-coding-agents/'],
  },
  {
    category: 'glossary', slug: 'human-in-the-loop', title: 'What does human-in-the-loop mean for coding agents?',
    description: 'Human-in-the-loop means a person makes a decision in an automated workflow. In Perch, you review and choose each supported agent response.',
    lead: 'Human-in-the-loop describes a workflow in which a person makes a decision at a defined point in an automated process. A coding-agent tool approval is one such point.',
    sections: [
      { title: 'A person supplies the decision', paragraphs: ['An agent may propose a command, ask a product question or present a plan. The person checks the scope and chooses whether or how to continue.', 'In Perch, answering is off by default. When enabled, Perch presents supported requests and sends the response you choose. It does not auto-approve a request or compose the decision for you.'] },
      { title: 'Keep enough context to review', paragraphs: ['A visible button is not enough context on its own. Check the project, the proposed action and the reason. If you need the rest of the conversation, return to the agent.', 'Perch’s two-second undo corrects a mistaken input during Sending. It does not replace careful review or undo actions already performed by the agent.'] },
    ], related: ['/blog/human-in-the-loop-coding/', '/guides/answering-agents/'],
  },
  {
    category: 'glossary', slug: 'local-first', title: 'What does local-first mean for Perch?',
    description: 'For Perch, local-first means the app keeps activity and notes on your Mac and makes no network requests. Agent provider processing remains separate.',
    lead: 'For Perch, local-first describes where its app data and interactions live: on your Mac. The app has no account or server and makes no network requests.',
    sections: [
      { title: 'Name the data and its lifetime', paragraphs: ['Perch saves status and notes locally. Pending answer requests stay in memory and are discarded once answered. Commands, prompts, diffs and transcripts are not saved as Perch session history.', 'The phrase local-first is useful here because it points to concrete behavior. The privacy policy is the source for the full description of what is read, stored and discarded.'] },
      { title: 'Keep other services separate', paragraphs: ['Your coding agent may still connect to its provider. Perch’s local design does not turn that service into offline software or change its privacy policy.', 'The website also has separate handling for launch-list signups, hosting, analytics and future payments. A claim about the Mac app should not be read as a claim about every linked service.'], links: [{ label: 'Read the privacy policy', href: '/privacy/' }] },
    ], related: ['/guides/privacy-and-permissions/', '/blog/status-without-transcripts/'],
  },
  {
    category: 'glossary', slug: 'tool-approval', title: 'What is a coding-agent tool approval?',
    description: 'A tool approval is your decision about a proposed agent action. Learn the difference between approving a tool, a plan and a completed result.',
    lead: 'A tool approval is a person’s decision about whether a coding agent may carry out a proposed action, such as running a command or making a change.',
    sections: [
      { title: 'Approve the actual action', paragraphs: ['Read the project and session as well as the proposed command or change. A familiar action can still be outside the intended task. If the request lacks enough context, open the original agent interface.', 'Perch supports opt-in allow and deny actions for Claude Code and Codex. Cursor’s documented Perch action is a reply after a turn, not in-card tool approval.'] },
      { title: 'Approval is different from verification', paragraphs: ['Allowing a tool gives it permission to act. It does not prove the action succeeded or that the result is correct. Likewise, agreeing to a plan is different from reviewing its eventual implementation.', 'After a turn, inspect the work in the project. Perch’s two-second undo applies before an answer is sent; it cannot reverse a command that already ran.'] },
    ], related: ['/guides/answering-agents/', '/guides/agent-compatibility/', '/blog/human-in-the-loop-coding/'],
  },
  {
    category: 'glossary', slug: 'context-switching', title: 'What is context switching in an agent workflow?',
    description: 'Context switching means moving attention between tasks or apps. Distinguish checking agent state from the focused work of reviewing its result.',
    lead: 'Context switching means moving your attention between tasks, projects or apps. In an agent workflow, one common example is leaving your work to check whether a terminal needs you.',
    sections: [
      { title: 'A check is different from a review', paragraphs: ['A status check asks whether something changed. A review asks what happened and whether it is correct. Keeping those questions separate can make your workflow easier to organize.', 'Perch puts supported states at the screen edge so a routine check does not always require opening the agent. When a decision or result needs attention, you still read it in context.'] },
      { title: 'Keep the useful switches', paragraphs: ['Switching to inspect a diff, understand a request or verify a result is part of development. Perch does not claim that all switching is waste or promise a measured productivity gain.', 'Clear session names and short local notes can help preserve the detail you will need after an interruption. Keep lasting project decisions in your normal documentation.'] },
    ], related: ['/blog/reduce-agent-context-switching/', '/guides/sticky-notes/'],
  },
];
