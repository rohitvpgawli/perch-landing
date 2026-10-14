export const product = {
    name: 'Perch', status: 'In development',
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
      { q: 'Does Perch need an account?', a: 'No. Perch is an independent Mac app for macOS 14 and later. It has no account or server. Your coding-agent subscriptions and API costs remain separate.' },
    ],
  } as const;
