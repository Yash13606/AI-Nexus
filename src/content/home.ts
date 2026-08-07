export const hero = {
  eyebrow: 'AI product company · Bengaluru + Singapore',
  headline: 'AI that shows its work.',
  lede: 'MedOrbit runs hospitals. Edvation runs schools. AdvoHub runs law practices. TrustProperty runs property. 48 AI agents across all four, and every one of them shows exactly how it got its answer.',
  summary: '48 AI agents · 22 Indian languages · Data hosted in India (AWS Mumbai)',
};

/** Section 2 tab switcher. One line per platform — the proof, not the pitch. */
export const showcase = {
  kicker: 'One screen, four institutions',
  heading: 'Pick an institution. Watch what the agent actually does.',
};

/** Bento proof grid. Every figure renders at final value — no count-up. */
export const proof = {
  kicker: 'Shipped, not roadmapped',
  heading: 'The whole system, counted.',
  lead: {
    figure: '48',
    label: 'named AI agents',
    body: 'Eleven in MedOrbit, twenty in Edvation, ten in AdvoHub, seven in TrustProperty. Each does a single job someone would otherwise do by hand, and each carries its own guardrails, its own audit trail and its own cost ceiling in rupees.',
  },
  tiles: [
    { figure: '4', label: 'platforms, one per industry' },
    { figure: '22', label: 'Indian languages' },
    { figure: 'ap-south-1', label: 'AWS Mumbai: your data stays in India' },
  ],
};

/** Standards strip. Capability statements — never rendered as logos. */
export const standards = [
  'ABDM',
  'FHIR R4',
  'HL7 v2',
  'NHCX',
  'eCourts v3.0',
  'BSA §63',
  'DPDP Act 2023',
  'GST e-invoicing',
  'RERA',
  'WCAG 2.1 AA',
];

export const disciplineBody =
  'Four industries, one engineering discipline: AI that shows its work, inside software that runs the whole institution. Every agent cites its source, every model call is redacted and logged, every output a human can override, and all of it sits on a complete operating system for the institution, not a chatbot beside one.';

export const governance = [
  {
    title: 'Redacted before the model sees it',
    points: ['Stripped before every model call', '9 Indian ID categories: Aadhaar, PAN, GSTIN, bank, passport'],
  },
  {
    title: 'Citations verified, or removed',
    points: ['Checked against Indian Kanoon or the source page', 'Unverifiable claims are removed, not caveated'],
  },
  {
    title: 'Consent gated, fail-closed',
    points: ['Checked before any data reaches a model', 'No consent, no call'],
  },
  {
    title: 'Agents propose, humans approve',
    points: ['No agent acts on its own', 'A clinician, pharmacist, biller or advocate signs off'],
  },
  {
    title: 'Cost ceilings in rupees',
    points: ['Every tenant sets a ceiling', 'Downshifts at the cap, never fails'],
  },
  {
    title: 'A kill switch per agent',
    points: ['One flag, instant off, per institution', 'No deployment, no support ticket'],
  },
  {
    title: 'Everything logged',
    points: ['Append-only audit trail', 'Every invocation, with the request that produced it'],
  },
  {
    title: 'Deterministic fallback',
    points: ['Deterministic engine per agent', 'Same schema, same anti-hallucination gates either way'],
  },
];

/** A real sequence — which is why these carry numbers. */
export const deployment = [
  { n: '01', title: 'Scope', body: 'A 30-minute demo on your own facility type, board, practice area or city, not a generic tour. You tell us what you run today.' },
  { n: '02', title: 'Configure', body: 'Modules, the role catalogue and the compliance surfaces are preset for your institution type, so nobody starts at a blank screen.' },
  { n: '03', title: 'Migrate', body: 'Your existing records are imported and reconciled. We do the mapping; you verify the result before anything goes live.' },
  { n: '04', title: 'Go live', body: 'Staff are trained, and the AI agents start in dry-run so your team watches them work before they act. Then they are switched on one at a time.' },
];

export const deploymentCaveat =
  'We do not publish a go-live duration, because we have not measured one across enough institutions to quote honestly.';

/** Each entry pairs the existing claim with a small real-data panel — every
 *  number here is published elsewhere on the site (platform stats, FAQ),
 *  never invented for the visual. */
export const why = [
  {
    title: 'One platform per institution',
    body: 'Each product replaces a stack of point tools with a single system and a single source of truth: 100+ modules in a hospital, a complete school OS under the teaching agents, twelve modules from intake to invoice in a law firm.',
    icon: 'grid',
    panelLabel: 'System size',
    stat: '100+',
    unit: 'modules',
    caption: 'Single system. Single source of truth.',
    rows: ['100+ modules · MedOrbit', '640+ screens · Edvation', '12 modules · AdvoHub'],
  },
  {
    title: 'AI that shows its work',
    body: 'Page citations in education. Indian Kanoon verification in law. Chart-grounded outputs in health. Explainable scores in property. Every one is checkable by the person relying on it.',
    icon: 'doc-check',
    panelLabel: 'Verified, not just generated',
    stat: '4',
    unit: 'verification methods',
    caption: 'Verified, not just generated.',
    rows: ['Page citations · Edvation', 'Indian Kanoon check · AdvoHub', 'Explainable scores · TrustProperty'],
  },
  {
    title: 'Built for India first',
    body: 'ABDM, NHCX and PM-JAY in healthcare. Any board in education. eCourts, GST, BSA §63 and 22 languages in law. RERA and registration workflows in property. Compliance and language are foundations here, not afterthoughts.',
    icon: 'globe',
    panelLabel: 'Indian languages',
    stat: '22',
    unit: 'Indian languages',
    caption: 'Compliance and workflows built in.',
    rows: ['13 · Edvation', '3 · TrustProperty', 'Hindi, Marathi, Kannada · MedOrbit'],
  },
  {
    title: 'Your data stays in India',
    body: 'Every platform runs in AWS Mumbai (ap-south-1) under the DPDP Act 2023, with consent flows, erasure workflows and audit trails built into the software.',
    icon: 'shield',
    panelLabel: 'Data residency',
    stat: 'ap-south-1',
    unit: 'AWS Mumbai',
    caption: 'DPDP Act 2023. Audit trails by design.',
    rows: ['DPDP Act 2023', 'Consent flows built in', 'Append-only audit trails'],
  },
];

export const roleFamilies = [
  { href: '/solutions/hospitals/', title: 'For hospitals', body: 'Doctors, nurses, lab, pharmacy, front office, billing and administrators, plus a separate patient portal.', meta: '8 roles · MedOrbit', hue: 'var(--color-medorbit)' },
  { href: '/solutions/schools/', title: 'For schools', body: 'Students, teachers, parents, principals and administrators, on one platform with six role views.', meta: '6 roles · Edvation', hue: 'var(--color-edvation)' },
  { href: '/solutions/law-firms/', title: 'For law firms', body: 'Nine seats from intern to managing partner, plus a client portal with its own authentication.', meta: '9 roles · AdvoHub', hue: 'var(--color-advohub)' },
  { href: '/solutions/property/', title: 'For property', body: 'Buyers and tenants, owners, agents and agencies, builders, service professionals and societies.', meta: '6 roles · TrustProperty', hue: 'var(--color-trustproperty)' },
];

export const faqs = [
  { q: 'What is AI Nexus Innovations Hub?', a: 'AI Nexus Innovations Hub is an AI product company incorporated in Bengaluru, India and Singapore that builds four AI-native platforms for regulated Indian industries: MedOrbit for hospitals, Edvation for K-12 schools, AdvoHub for legal practice, and TrustProperty for property. The company was founded in 2025 and operates from Bengaluru and Singapore.' },
  { q: 'What products does AI Nexus build?', a: 'Four AI platforms: MedOrbit, an AI-native hospital operating system for 23 types of Indian healthcare facility; Edvation, a K-12 school platform whose AI teaches from the school’s own textbooks; AdvoHub, an AI practice platform for Indian advocates; and TrustProperty, an AI-native property platform for India.' },
  { q: 'How many AI agents does AI Nexus build?', a: '48 named AI agents across four platforms: 11 in MedOrbit, 20 in Edvation, 10 in AdvoHub and 7 in TrustProperty. Each has a specific job, its own guardrails and its own audit trail.' },
  { q: 'Where is AI Nexus Innovations Hub based?', a: 'In Bengaluru, India (AI Nexus Innovations Hub Pvt. Ltd., CIN U47413KA2025PTC210603) and Singapore (AI Nexus Innovations Hub Pte. Ltd., UEN 202550378W). The office is in Bengaluru, Karnataka.' },
  { q: 'Where is customer data stored?', a: 'In India. Every platform runs in AWS Mumbai (ap-south-1) under the Digital Personal Data Protection Act 2023, with consent flows, erasure workflows and append-only audit trails built into the software.' },
  { q: 'How does AI Nexus stop the AI from making things up?', a: 'Differently in each industry, and always as a technical control rather than a disclaimer. In law, every citation is verified against Indian Kanoon and unverifiable authorities are removed from the answer. In education, every grounded answer carries the page number from the school’s own textbook. In healthcare, outputs are grounded in the chart and a clinician signs before anything enters the record. In property, the concierge answers only from the listing’s verified facts.' },
  { q: 'Which Indian languages are supported?', a: 'Up to 22 Indian languages in AdvoHub, 13 in Edvation, Hindi, Marathi and Kannada among others in MedOrbit, and English, हिंदी and Hinglish in TrustProperty.' },
  { q: 'Is pricing published?', a: 'For AdvoHub, yes: Solo Advocate ₹999 per month and Firm ₹3,999 per seat per month, GST-inclusive, with a 14-day trial. TrustProperty publishes its service prices, from ₹1,499 for an encumbrance check. MedOrbit and Edvation are quoted per institution, because pricing depends on facility type or school size.' },
  { q: 'How do I get a demo?', a: 'Email raju@ainexushub.ai or call +91 95385 22221. A demo of any platform takes about 30 minutes, runs on your own institution type rather than a generic tour, and there is no charge. We reply within one business day.' },
];

export const aboutBlock = [
  'AI Nexus Innovations Hub was founded in 2025 to bring AI-native software to four industries that touch the most lives (healthcare, education, law and property), starting with India, where the gap between how these institutions work and what their software supports is widest.',
  'We are a product company, not a consultancy. We build, operate and support all four platforms end to end, from Bengaluru and Singapore.',
  'We also try to be careful about what we claim. Our platforms publish capability statements rather than certification logos, label illustrative examples as illustrative, and decline to quote figures we have not measured. That is a deliberate choice in a market where badge walls are the norm.',
];
