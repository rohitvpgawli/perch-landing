// Real quotes from Perch users, shown on the home page in place of the stats strip.
// Only add quotes you have permission to publish, attributed as the person agreed.
// The section stays hidden while this list is empty.
//
// quote:   their words, lightly trimmed. No em dashes.
// name:    how they asked to be credited.
// role:    optional, e.g. "Staff engineer" or "Indie developer".
// company: optional; only with their permission.
// avatar:  optional path under /public, e.g. "/people/sam.webp". Initials are used otherwise.
// link:    optional URL to their profile or the original post.
// featured: optional; at most one, shown large above the others.
export interface Testimonial {
  quote: string;
  name: string;
  role?: string;
  company?: string;
  avatar?: string;
  link?: string;
  featured?: boolean;
}

export const testimonials: Testimonial[] = [];
