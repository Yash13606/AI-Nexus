/** The URL set. Static endpoint — no @astrojs/sitemap dependency for 18 routes. */
import type { APIRoute } from 'astro';
import { platforms } from '../content/platforms';
import { solutions } from '../content/solutions';

const SITE = 'https://www.ainexushub.ai';

const routes = [
  '/',
  '/platforms/',
  ...platforms.map((p) => `/platforms/${p.slug}/`),
  ...solutions.map((s) => `/solutions/${s.slug}/`),
  '/ai-agents/',
  '/security/',
  '/about/',
  '/contact/',
  '/login/',
  '/privacy/',
  '/terms/',
  '/sitemap/',
];

export const GET: APIRoute = () => {
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map((r) => `  <url><loc>${SITE}${r}</loc></url>`).join('\n')}
</urlset>
`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
};
