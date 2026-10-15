export const perch = {
  name: 'Perch', origin: 'https://perched.fyi', price: 29, currency: 'USD',
  description: 'See every Claude Code, Codex and Cursor session from the edge of your Mac, then approve, answer and reply in a keystroke. No account, no server. Nothing leaves your Mac.',
  support: 'https://github.com/rohitvpgawli/perch-landing/issues',
  requirements: 'macOS 14+ · Native SwiftUI + AppKit',
};
// A live link alone must never open sales before delivery is ready.
const configured = import.meta.env.STRIPE_PERCH_PAYMENT_LINK?.trim();
export const deliveryReady = import.meta.env.PERCH_DELIVERY_READY === 'true';
export let paymentLink = '';
if (configured) {
  const url = new URL(configured);
  if (url.protocol !== 'https:' || url.hostname !== 'buy.stripe.com' || url.username || url.password || url.pathname.startsWith('/test_')) {
    throw new Error('STRIPE_PERCH_PAYMENT_LINK must be a live https://buy.stripe.com Payment Link.');
  }
  if (deliveryReady) paymentLink = url.href;
}
export const checkoutReady = Boolean(paymentLink);
export const purchaseHref = '/checkout/';
// Cloudflare Web Analytics site token; the beacon is omitted when unset.
export const analyticsToken = import.meta.env.CF_WEB_ANALYTICS_TOKEN?.trim() ?? '';
if (analyticsToken && !/^[0-9a-f]{32}$/.test(analyticsToken)) {
  throw new Error('CF_WEB_ANALYTICS_TOKEN must be a 32-character Cloudflare Web Analytics site token.');
}
