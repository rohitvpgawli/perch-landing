import type { ContentPage } from './types';
import { contentDate } from './types';
export const articles: ContentPage[] = [
  {
    category: 'blog', slug: 'monitor-multiple-coding-agents', published: contentDate,
    title: 'How to monitor multiple coding agents without checking every terminal',
    description: 'A practical review loop for parallel coding agents: bound the tasks, distinguish running from waiting, and verify each completed result.',
    lead: 'The first parallel agent feels like extra capacity. The fourth can feel like another inbox. A useful monitoring workflow starts by separating three questions: what is running, what needs a decision, and what is ready to review.',
    sections: [
      { title: 'Start with task boundaries', paragraphs: ['Before deciding where to watch agents, decide what each one owns. “Improve the app” is difficult to coordinate across sessions. “Add the empty state to this screen” and “review the request cancellation path” give you clearer ownership and a result you can inspect.', 'If sessions may change overlapping files, use separate working copies or another isolation approach in your existing development process. A status monitor cannot prevent a conflict. A clear division of work is still the foundation.'] },
      { title: 'Give each state a different response', paragraphs: ['Running work usually needs patience. Waiting work needs a decision. A completed turn needs review. Treating all three as “check the terminal” makes you reopen sessions that have nothing new to show.', 'Perch puts supported sessions into Needs you, Working and Recent. The screen-edge marks make the same distinction visible while you are in another app. This is a way to route your attention; it is not a measure of whether the code is ready to ship.'] },
      { title: 'Build a short review loop', steps: ['Check waiting sessions when you can give a decision your attention.', 'Identify the project before reading the command or question.', 'Answer the supported request, or open the agent for more context.', 'Review completed work in the project, including the diff and the relevant checks.', 'Give the next instruction only after deciding what the previous turn actually accomplished.'] },
      { title: 'Keep provider limits visible', paragraphs: ['Not every integration reports the same events. Cursor passive hooks do not expose awaiting-permission status. Claude Code supports tools, questions, plans and replies in Perch; Codex has approvals and replies; Cursor has replies after a turn. Answering is opt-in.', 'A good workflow leaves room to return to the original app. Missing a supported event and expecting an unsupported event are different problems, and they need different fixes.'] },
      { title: 'Use the shelf for attention, the project for proof', paragraphs: ['Recent steps can tell you that a session edited files or ran a command and how long it took. They do not preserve the command output or explain whether a test was meaningful. Use them to decide where to look next, then verify the result at its source.', 'That division keeps the monitor small and the review grounded: Perch helps you notice the handoff; you decide whether the work meets the task.'] },
    ],
    related: ['/use-cases/parallel-agents/', '/guides/agent-compatibility/', '/alternatives/terminal-tabs/'],
  },
  {
    category: 'blog', slug: 'status-without-transcripts', published: contentDate,
    title: 'Why an agent status monitor does not need your transcripts',
    description: 'How Perch separates session status from request content, and what a status-only recent-steps view can and cannot tell you about coding work.',
    lead: '“Is it still working?” is a much smaller question than “What did it say?” Perch keeps those questions separate, using local activity events for monitoring rather than retaining a second copy of an agent conversation.',
    sections: [
      { title: 'The information a glance needs', paragraphs: ['To show a working session, a monitor needs a session identity and a state. To help you find that session later, it needs context such as the project folder and host app. Times and tool names can describe recent activity without carrying the arguments or the output.', 'Perch saves that kind of status locally: session identifiers, folder, state, times, terminal context and tool names. Prompts, commands, diffs, responses and transcripts do not become its stored session history.'] },
      { title: 'A request has a different lifetime', paragraphs: ['Answering a request does require showing its content. You should see what a tool wants to run or what question an agent is asking before responding. In Perch, a pending request reaches the app over a private local socket and stays in memory while it is waiting.', 'That content is discarded once you answer. It does not need to become a searchable transcript just because it was visible on a card. The data needed to make a decision and the data needed to show a past state are different.'] },
      { title: 'What Recent steps can tell you', paragraphs: ['A recent-steps list can describe the sequence and timing of activity: work started, a tool ran, the session needed you, and a turn finished. It can give you a quick way back into the rhythm of a session.', 'It cannot explain the full reasoning, preserve the output of every command or establish that an edit was correct. For that, open the agent and inspect the project. A status summary should not pretend to be a complete audit log.'] },
      { title: 'Local monitoring does not change the agent provider', paragraphs: ['Perch itself makes no network requests. Claude Code, Codex and Cursor remain separate tools. Their own processing and data policies still apply to the material you give them.', 'Likewise, this website’s launch list and hosting are separate from the local app. A useful privacy explanation names the system, the data and the lifetime instead of applying one broad label to everything around a product.'] },
    ],
    related: ['/guides/privacy-and-permissions/', '/privacy/', '/glossary/local-first/'],
  },
  {
    category: 'blog', slug: 'human-in-the-loop-coding', published: contentDate,
    title: 'Keep a human decision in the coding-agent loop',
    description: 'Make agent approvals easier to review without turning them into automatic decisions. A practical approach to context, scope, undo and handoff.',
    lead: 'A permission prompt is useful only if the person answering understands it. Moving the prompt closer can help, but the review still needs the project, the proposed action and enough context to decide.',
    sections: [
      { title: 'Read the action before the button', paragraphs: ['A familiar-looking test command can belong to an unfamiliar project. Before allowing a tool, identify the session, read the actual command or change, and compare it with the task you intended.', 'Perch shows the supported request on a card so the decision can happen without first locating the terminal. The goal is to make a deliberate review easier to reach. A short route to Allow is not a reason to skip reading.'] },
      { title: 'Separate different kinds of consent', paragraphs: ['Approving a tool, choosing a product direction, accepting a plan and replying to a finished turn are different decisions. For Claude Code, Perch gives these their own supported interactions: tool requests, numbered questions, plan review and replies.', 'Codex and Cursor have narrower action sets. The compatibility guide matters because a single “works with” label cannot explain what you can actually decide from the shelf.'] },
      { title: 'Use undo for a mistaken input', paragraphs: ['Every answer has a two-second Sending window. Esc or Undo can stop an accidental answer during that period. This is a correction for a mistaken click or keypress, not a rollback system.', 'Once the agent receives the answer, undo cannot reverse the command it runs or the files it edits. Reversing a change belongs in the project’s normal development workflow.'] },
      { title: 'Keep a route back to the agent', paragraphs: ['Sometimes the card is enough. Sometimes you need the rest of the conversation, the repository or a command’s full output. Returning to the original app is part of a good review loop.', 'Perch steps aside when you are in the session’s app and hands held requests back after your chosen wait. Answering stays off until you enable it. Those boundaries leave the decision with the person and the work with the agent.'] },
      { title: 'A small checklist before responding', bullets: ['Is this the intended project and session?', 'Does the action fit the task’s scope?', 'Do I have enough context to decide here?', 'Am I authorizing the action I actually mean to authorize?'] },
    ],
    related: ['/guides/answering-agents/', '/glossary/human-in-the-loop/', '/glossary/tool-approval/'],
  },
  {
    category: 'blog', slug: 'reduce-agent-context-switching', published: contentDate,
    title: 'Reduce the checking loop around your coding agents',
    description: 'Distinguish checking for a change from reviewing a result. Use visible state, project names and small notes to manage agent handoffs on Mac.',
    lead: 'Opening an agent window is useful when there is something to read. Reopening it just to find out whether anything happened adds a different kind of work: remembering where you were before the check.',
    sections: [
      { title: 'Ask a smaller question first', paragraphs: ['“Does this session need me?” is a useful first check. If the answer is no, you can stay with the work in front of you. If the answer is yes, the next step is to read the actual request in context.', 'Perch makes supported activity states visible at the screen edge. It does not claim to measure your attention or guarantee a productivity improvement. It simply gives the status question a nearby answer.'] },
      { title: 'Use names that survive an interruption', paragraphs: ['A vague session label can force you to reconstruct the project before every response. Local session names such as “Checkout: cancellation case” or “Docs: install steps” give you a more useful starting point.', 'Names do not replace reading the request. They make it easier to notice when the action belongs to the wrong task before you answer.'] },
      { title: 'Park follow-ups instead of changing the current turn', paragraphs: ['While an agent works, a new idea can tempt you to alter its task immediately. Sometimes that is necessary; often it can wait until you have reviewed the current result.', 'Perch’s sticky notes offer a place for that next thought. Write it, keep it beside the work, and copy it into the next instruction when the timing is right. Notes are local and do not dispatch automatically.'] },
      { title: 'Keep meaningful review in the loop', paragraphs: ['The aim is to reduce empty checks, not to remove the review that catches mistakes. A green check means a turn finished, not that the implementation passed your acceptance criteria.', 'When work is ready, open the project. Read the diff, inspect the behavior and run the checks that matter. Then choose whether the agent should continue or whether the task is complete.'] },
      { title: 'Start with one change to your routine', steps: ['Use Perch for one session before adding more.', 'Give that session a clear name and a bounded task.', 'Use visible status for checks and the project for review.', 'Add notes or opt-in answering only when they solve a recurring part of your workflow.'] },
    ],
    related: ['/guides/sticky-notes/', '/guides/keyboard-shortcuts/', '/use-cases/developers/'],
  },
  {
    category: 'blog', slug: 'agent-monitor-vs-agent', published: contentDate,
    title: 'A coding agent, a monitor and an orchestrator do different jobs',
    description: 'Understand where Perch fits beside coding agents: local activity and human responses, with task execution and orchestration kept separate.',
    lead: 'Tools around coding agents can look similar while doing very different work. It helps to separate who executes a task, who shows its state, and who coordinates several tasks together.',
    sections: [
      { title: 'The coding agent does the task', paragraphs: ['A coding agent is the tool you ask to inspect a project, propose a change or carry out work. You interact with that agent in its supported terminal or editor workflow. Its capabilities, access and service usage belong to that product.', 'Perch does not supply an agent or replace one. You continue using Claude Code, Codex or Cursor, and their subscriptions or API usage remain separate.'] },
      { title: 'The monitor helps you notice the handoff', paragraphs: ['A monitor answers a narrower set of questions: which session is working, which turn has ended, and which supported event needs your attention. Perch brings those states into a local shelf and screen-edge tab.', 'With answering enabled, Perch can also pass along actions you choose. The supported actions differ by provider. It does not decide what an agent should do or generate a response for you.'] },
      { title: 'Orchestration coordinates the work', paragraphs: ['Task assignment, dependencies, isolated working copies, scheduling and merging are coordination problems. A workflow that handles those problems needs more than a list of session states.', 'Perch does not assign work or resolve edit conflicts. If you run sessions in parallel, keep ownership and verification in your development process. A monitor can sit alongside that process without becoming its coordinator.'] },
      { title: 'Choose around the gap in your current setup', paragraphs: ['If you need an agent, start with its own product and capabilities. If your agents already work well but you keep checking whether they need you, local visibility may be the gap. If you need a shared remote queue or team coordination, identify those requirements explicitly.', 'Our comparisons discuss manual terminal checking, notifications and shared dashboards as approaches. They do not rank products from different categories as if they all solve the same problem.'] },
    ],
    related: ['/alternatives/', '/use-cases/parallel-agents/', '/glossary/agent-session/'],
  },
];
