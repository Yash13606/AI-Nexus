/** ── /about/ page content ───────────────────────────────────────────────────
 *
 *  Every figure and milestone here is verifiable from the rest of the codebase
 *  (src/content/site.ts, src/content/platforms.ts, src/content/pages.ts). No
 *  invented statistics, no invented people — the brand's own §terms ethos is
 *  "decline to quote figures we have not measured", and this page keeps to it.
 *
 *  Leadership placeholders are labelled as placeholders on purpose: the layout
 *  is complete, the content slot is honest scaffolding for the client to fill.
 */

/* ── Hero ─────────────────────────────────────────────────────────────────── */
export const aboutHero = {
  eyebrow: 'About AI Nexus',
  headline: 'A product company for the institutions that matter most.',
  lede: 'AI Nexus Innovations Hub builds AI-native software for four regulated industries that touch the most lives — healthcare, education, law and property — engineered in Bengaluru and Singapore, held to one discipline.',
};

/* ── Story · Vision · Mission ─────────────────────────────────────────────────
 *  Paraphrased directly from the existing About and home copy — not new facts. */
export const story = {
  eyebrow: 'Who we are',
  heading: 'We build the software these industries were missing.',
  body: [
    'AI Nexus Innovations Hub was founded in 2025 to bring AI-native software to four industries that touch the most lives — healthcare, education, law and property — starting with India, where the gap between how these institutions work and what their software supports is widest.',
    'We are a product company, not a consultancy. We build, operate and support all four platforms end to end, from Bengaluru and Singapore.',
    'We also try to be careful about what we claim. Our platforms publish capability statements rather than certification logos, label illustrative examples as illustrative, and decline to quote figures we have not measured. That is a deliberate choice in a market where badge walls are the norm.',
  ],
};

export const pillars = [
  {
    label: 'Our vision',
    body: 'Close the gap between how the institutions that matter most actually work and what their software is able to support.',
  },
  {
    label: 'Our mission',
    body: 'Build, operate and support AI-native platforms for the four regulated industries that touch the most lives — and make every AI action cite its source, log its trail and defer to a human.',
  },
];

/* ── Stats — verifiable only ──────────────────────────────────────────────────
 *  4 platforms & 48 agents: src/content/platforms.ts (11 + 20 + 10 + 7 = 48).
 *  2 countries & 4 industries: src/content/site.ts entities + platform sectors. */
export const stats = [
  { figure: '4', label: 'AI platforms', sub: 'Health · Education · Law · Property' },
  { figure: '48', label: 'AI agents built', sub: 'Each with one job and its own audit trail' },
  { figure: '4', label: 'Regulated industries', sub: 'One engineering discipline across all' },
  { figure: '2', label: 'Countries', sub: 'Incorporated in India and Singapore' },
];

/* ── Timeline — real milestones ───────────────────────────────────────────────
 *  CINs/UENs from site.ts; AWS Mumbai + DPDP from pages.ts. */
export const timeline = [
  {
    marker: '2025',
    title: 'AI Nexus is founded',
    body: 'AI Nexus Innovations Hub Pvt. Ltd. is incorporated in Bengaluru, Karnataka (CIN U47413KA2025PTC210603) as a product company for regulated Indian industries.',
  },
  {
    marker: '2025',
    title: 'A second home in Singapore',
    body: 'AI Nexus Innovations Hub Pte. Ltd. is established (UEN 202550378W), anchoring the company across two markets from day one.',
  },
  {
    marker: '2025',
    title: 'Four platforms enter build',
    body: 'MedOrbit for hospitals, Edvation for K-12 schools, AdvoHub for legal practice and TrustProperty for property — four products, one shared engineering discipline.',
  },
  {
    marker: '2025',
    title: '48 AI agents ship',
    body: 'Forty-eight named agents across the four platforms — not one assistant with many prompts, but single-purpose agents, each carrying its own guardrails, cost ceiling and audit trail.',
  },
  {
    marker: 'Today',
    title: 'Running in India, held in India',
    body: 'All four platforms run in AWS Mumbai (ap-south-1) under the Digital Personal Data Protection Act 2023. Data does not leave the country in normal operation.',
  },
];

/* ── Core values — drawn from the documented brand ethos ───────────────────── */
export const values = [
  {
    index: '01',
    title: 'Evidence over claims',
    body: 'Every answer shows its source — page citations in education, Indian Kanoon verification in law, chart-grounded outputs in health, explainable scores in property.',
  },
  {
    index: '02',
    title: 'A human always approves',
    body: 'No agent files, prescribes, sends or bills on its own. Every AI-assisted output is gated behind a human decision and written to an append-only audit trail.',
  },
  {
    index: '03',
    title: 'Capability, not badges',
    body: 'We publish capability statements rather than certification logos, label illustrative examples as illustrative, and publish certificates only when they exist.',
  },
  {
    index: '04',
    title: 'Built for India, held in India',
    body: 'All four platforms run in AWS Mumbai under the DPDP Act 2023. Personal identifiers are redacted before any model call, and customer data is never used to train models.',
  },
  {
    index: '05',
    title: 'Products, not consulting',
    body: 'We build, operate and support all four platforms end to end. The same team that ships the software runs it and answers for it.',
  },
  {
    index: '06',
    title: 'One discipline, four industries',
    body: 'The same rigour — cited sources, redaction, logging, human override — runs through healthcare, education, law and property alike.',
  },
];

/* ── Leadership ───────────────────────────────────────────────────────────────
 *  One real, on-record leader. Remaining cards are explicit placeholders that
 *  preserve the grid without inventing people. Fill `placeholder` entries with
 *  real profiles and an image at /public, then flip `placeholder` off. */
export type Leader = {
  name: string;
  role: string;
  bio?: string;
  linkedin?: string;
  image?: string;
  placeholder?: boolean;
};

export const leaders: Leader[] = [
  {
    name: 'Geetha R',
    role: 'Founder & Director',
    bio: 'Founder and director of AI Nexus Innovations Hub, leading the company across its Bengaluru and Singapore entities and setting the engineering discipline that runs through all four platforms.',
    linkedin: 'https://www.linkedin.com/company/110654999',
    // image: '/leadership/geetha-r.jpg', // add a portrait to /public/leadership/ then uncomment
  },
];
