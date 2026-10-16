// Canonicalize to https://perched.fyi before serving static assets.
const origin = 'perched.fyi';
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];

// POST /api/waitlist stores one address per person in D1. Fetch callers get JSON;
// plain form posts (no JS) are redirected back with ?joined=1.
async function joinWaitlist(request, env) {
  const form = await request.formData().catch(() => null);
  const wantsJson = (request.headers.get('accept') || '').includes('application/json');
  const reply = (status, body) => wantsJson
    ? Response.json(body, { status })
    : Response.redirect(new URL(`/?joined=${body.ok ? 1 : 0}#join`, request.url).href, 303);

  // The hidden "company" field is a honeypot: people never fill it in.
  if (!form || form.get('company')) return reply(200, { ok: true });
  const email = String(form.get('email') || '').trim().toLowerCase();
  if (email.length > 254 || !emailPattern.test(email)) return reply(400, { ok: false, error: 'Please enter a valid email address.' });
  const source = String(form.get('source') || '').slice(0, 40) || null;
  const utm = utmKeys.map(key => String(form.get(key) || '').trim().slice(0, 100) || null);

  try {
    await env.WAITLIST
      .prepare(`INSERT OR IGNORE INTO waitlist (email, source, country, ${utmKeys.join(', ')}) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`)
      .bind(email, source, request.cf?.country ?? null, ...utm)
      .run();
  } catch (error) {
    console.error('waitlist insert failed', error);
    return reply(500, { ok: false, error: 'Something went wrong. Please try again.' });
  }
  return reply(200, { ok: true });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if ((url.protocol === 'http:' && url.hostname === origin) || url.hostname === `www.${origin}`) {
      url.protocol = 'https:';
      url.hostname = origin;
      return Response.redirect(url.href, 301);
    }
    if (url.pathname === '/api/waitlist') {
      if (request.method !== 'POST') return new Response('Method not allowed', { status: 405, headers: { allow: 'POST' } });
      return joinWaitlist(request, env);
    }
    return env.ASSETS.fetch(request);
  },
};
