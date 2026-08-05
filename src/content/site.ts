/** Routes not yet built. Anything pointing here renders as text, never a dead
 *  link. Delete an entry when its page ships. BUILD-PLAN.md §5.
 *
 *  Empty as of Phase 2 — all 18 routes exist. The mechanism stays because the
 *  next new page is cheaper to add than to re-derive. */
export const PLANNED_ROUTES = new Set<string>([]);

export const isPlanned = (href: string) => PLANNED_ROUTES.has(href);

export const nav = [
  { href: '/platforms/', label: 'Platforms' },
  { href: '/ai-agents/', label: 'AI agents' },
  { href: '/solutions/hospitals/', label: 'Solutions' },
  { href: '/security/', label: 'Security' },
  { href: '/about/', label: 'About' },
];

export const contact = {
  email: 'raju@ainexushub.ai',
  phone: '+91 95385 22221',
  phoneHref: 'tel:+919538522221',
  hours: 'Mon–Sat, 9:00–19:00 IST',
  office: 'Bengaluru, Karnataka',
  linkedin: 'https://www.linkedin.com/company/110654999',
};

export const entities = [
  { region: 'India', name: 'AI Nexus Innovations Hub Pvt. Ltd.', id: 'CIN U47413KA2025PTC210603', place: 'Bengaluru, Karnataka' },
  { region: 'Singapore', name: 'AI Nexus Innovations Hub Pte. Ltd.', id: 'UEN 202550378W', place: 'Singapore' },
];

export const footerCols = [
  {
    title: 'Platforms',
    links: [
      { href: '/platforms/medorbit/', label: 'MedOrbit' },
      { href: '/platforms/edvation/', label: 'Edvation' },
      { href: '/platforms/advohub/', label: 'AdvoHub' },
      { href: '/platforms/trustproperty/', label: 'TrustProperty' },
      { href: '/platforms/', label: 'All platforms' },
    ],
  },
  {
    title: 'AI agents',
    links: [
      { href: '/ai-agents/', label: 'All 48 agents' },
      { href: '/ai-agents/#medorbit', label: 'MedOrbit (11)' },
      { href: '/ai-agents/#edvation', label: 'Edvation (20)' },
      { href: '/ai-agents/#advohub', label: 'AdvoHub (10)' },
      { href: '/ai-agents/#trustproperty', label: 'TrustProperty (7)' },
    ],
  },
  {
    title: 'Solutions',
    links: [
      { href: '/solutions/hospitals/', label: 'For hospitals' },
      { href: '/solutions/schools/', label: 'For schools' },
      { href: '/solutions/law-firms/', label: 'For law firms' },
      { href: '/solutions/property/', label: 'For property' },
    ],
  },
  {
    title: 'Company',
    links: [
      { href: '/about/', label: 'About' },
      { href: '/security/', label: 'Security' },
      { href: '/contact/', label: 'Contact' },
      { href: '/login/', label: 'Log in' },
      { href: '/sitemap/', label: 'Sitemap' },
      { href: '/privacy/', label: 'Privacy' },
      { href: '/terms/', label: 'Terms' },
    ],
  },
];

export const productSites = [
  { href: 'https://www.medorbit.ai', label: 'medorbit.ai' },
  { href: 'https://www.edvation.ai', label: 'edvation.ai' },
  { href: 'https://www.advohub.ai', label: 'advohub.ai' },
  { href: 'https://www.trustproperty.ai', label: 'trustproperty.ai' },
];

export const orgDescription =
  'AI Nexus Innovations Hub is an AI product company incorporated in Bengaluru, India and Singapore that builds four AI-native platforms for regulated Indian industries: MedOrbit for hospitals, Edvation for K-12 schools, AdvoHub for legal practice, and TrustProperty for property.';
