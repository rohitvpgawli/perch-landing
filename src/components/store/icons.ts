// Drawn stand-ins for the provider app icons Perch shows. Shared by the page and the live demo.
const rays = Array.from({ length: 12 }, (_, i) => {
  const a = (i * 30 + 8) * Math.PI / 180;
  const r = i % 2 ? 10.5 : 12.5;
  return `<line x1="${(20 + Math.cos(a) * 3).toFixed(2)}" y1="${(20 + Math.sin(a) * 3).toFixed(2)}" x2="${(20 + Math.cos(a) * r).toFixed(2)}" y2="${(20 + Math.sin(a) * r).toFixed(2)}"/>`;
}).join('');

export const providerIcons = {
  claude: `<svg viewBox="0 0 40 40" aria-hidden="true"><defs><linearGradient id="pg-claude" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#E5876A"/><stop offset="1" stop-color="#C95F3F"/></linearGradient></defs><rect width="40" height="40" rx="9" fill="url(#pg-claude)"/><g stroke="#fff" stroke-width="2.5" stroke-linecap="round">${rays}</g></svg>`,
  codex: `<svg viewBox="0 0 40 40" aria-hidden="true"><defs><radialGradient id="pg-codex" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#B9CCFF"/><stop offset=".45" stop-color="#6F86FF"/><stop offset="1" stop-color="#5B3FE0"/></radialGradient></defs><rect width="40" height="40" rx="9" fill="#14141A"/><g fill="url(#pg-codex)"><circle cx="16" cy="19" r="8"/><circle cx="24" cy="15.5" r="7.5"/><circle cx="27" cy="23.5" r="7"/><circle cx="18" cy="26" r="6.5"/></g><g fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="13.5,17 17.5,20.5 13.5,24"/><line x1="20" y1="25" x2="26" y2="25"/></g></svg>`,
  cursor: `<svg viewBox="0 0 40 40" aria-hidden="true"><rect width="40" height="40" rx="9" fill="#121213"/><polygon points="20,8.5 30.5,14.5 20,20.5 9.5,14.5" fill="#E4E4E4"/><polygon points="9.5,14.5 20,20.5 20,32 9.5,26" fill="#6E6E6E"/><polygon points="30.5,14.5 20,20.5 20,32 30.5,26" fill="#A9A9A9"/><polygon points="20,20.5 30.5,14.5 20,13" fill="#fff" opacity=".35"/></svg>`,
  terminal: `<svg viewBox="0 0 40 40" aria-hidden="true"><defs><linearGradient id="pg-term" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3A3B3F"/><stop offset="1" stop-color="#151517"/></linearGradient></defs><rect width="40" height="40" rx="9" fill="url(#pg-term)"/><rect x="1" y="1" width="38" height="38" rx="8" fill="none" stroke="#fff" stroke-opacity=".14"/><g fill="none" stroke="#E8E8E8" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><polyline points="10,14 15,18.5 10,23"/><line x1="18" y1="24" x2="27" y2="24"/></g></svg>`,
  finder: `<svg viewBox="0 0 40 40" aria-hidden="true"><defs><linearGradient id="pg-finder" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#7CC4FF"/><stop offset=".5" stop-color="#2E8EF0"/><stop offset=".5" stop-color="#DDEBFA"/><stop offset="1" stop-color="#F4F8FD"/></linearGradient></defs><rect width="40" height="40" rx="9" fill="url(#pg-finder)"/><g fill="none" stroke="#1B2A44" stroke-width="2" stroke-linecap="round"><line x1="14" y1="14" x2="14" y2="18"/><line x1="26" y1="14" x2="26" y2="18"/><path d="M12 26c5 4 11 4 16 0"/><path d="M21 9c-2 7-3 12-1 19"/></g></svg>`,
} as const;

export type ProviderKey = keyof typeof providerIcons;
