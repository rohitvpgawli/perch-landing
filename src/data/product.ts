export const product = {
    name: 'Perch', status: 'In development',
    category: 'Agent status, answers & sticky notes for Mac', short: 'Your agents, one glance away.',
    description: 'Working, finished, or waiting on you. See every agent at the edge of your screen, answer it in a keystroke, and keep a note for what comes next.',
    requirements: 'macOS 14+ · Native SwiftUI + AppKit',
    included: ['Native Mac app and screen-edge shelf', 'Agent status for Claude Code, Codex and Cursor', 'Opt-in approvals, answers and replies', 'Pinned sticky notes', 'Keyboard shortcuts and local storage'],
    faq: [
      { q: 'Which agents work with Perch?', a: 'Claude Code, Codex and Cursor. Perch shows when each session is working, finished or waiting on you. Live checks are recorded for the Claude Code CLI and Cursor’s local Agent, and Codex CLI answering was checked live. The Codex desktop app is not verified yet. Ordinary Claude chats and OpenCode are not supported.' },
      { q: 'Can I answer my agents from Perch?', a: 'Yes, if you turn it on (it is off by default). For Claude Code you can allow or deny a tool with the exact command or change in view, answer its questions with a number key, approve or revise its plans, and reply when a turn ends. Codex supports allow, deny and replies. Cursor supports a reply when a turn finishes. Every answer waits two seconds so you can undo it, and Perch never answers on its own.' },
      { q: 'What if I am already in the terminal?', a: 'Perch steps aside. If the session’s app is in front when a request arrives, or you switch to it and stay, the agent asks there as usual. After a wait you choose (2 to 30 minutes), or if Perch quits, everything is handed back.' },
      { q: 'Does it open the right window?', a: 'Claude desktop Code sessions open their conversation. Terminal sessions bring their terminal forward, and with the optional “Go to the exact tab” setting Perch can select the session’s Terminal or iTerm2 tab or tmux pane. Cursor opens the app rather than a specific chat.' },
      { q: 'Does Perch need an account or special permissions?', a: 'No account, no server and no network requests. No screen recording, microphone or Accessibility access. The only prompt you might see is macOS asking whether Perch may switch Terminal or iTerm2 tabs, and only if you turn on exact-tab jumping.' },
    ],
  } as const;
