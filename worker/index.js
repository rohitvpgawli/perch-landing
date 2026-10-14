// Canonicalize to https://perched.fyi before serving static assets.
const origin = 'perched.fyi';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.protocol === 'http:' || url.hostname === `www.${origin}`) {
      url.protocol = 'https:';
      url.hostname = origin;
      return Response.redirect(url.href, 301);
    }
    return env.ASSETS.fetch(request);
  },
};
