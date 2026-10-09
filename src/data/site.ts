import { ROOT_DOMAIN, companyOrigin } from './hosts';

export const site = {
  name: 'Quiet Machines',
  short: 'Quiet Machines',
  studio: 'Quiet Machines',
  domain: ROOT_DOMAIN,
  origin: companyOrigin(),
  description:
    'Quiet Machines builds small Mac tools that help thousands of people worldwide move faster and keep more freedom in how they work. Pay once. No subscriptions.',
  tagline: 'Tools that help you move fast — and stay free.',
  email: 'hello@rileygallagher.com',
  support: 'support@rileygallagher.com',
  maker: {
    name: 'Riley Gallagher',
    place: 'Vancouver',
  },
  links: [
    { label: 'X', href: 'https://x.com/' },
    { label: 'Substack', href: 'https://substack.com/' },
    { label: 'GitHub', href: 'https://github.com/' },
  ],
};
