export type Section = { h: string; body: string[] };

/* ── /security/ ─────────────────────────────────────────────────────────── */
export const securityFaqs = [
  {
    q: 'Where is customer data stored?',
    a: 'In India. All four platforms run in AWS Mumbai (ap-south-1) under the Digital Personal Data Protection Act 2023, with consent flows, erasure workflows and append-only audit trails built into the software.',
  },
  {
    q: 'Is customer data used to train AI models?',
    a: 'No. Personal identifiers are redacted before any model call, and customer data is not used to train models.',
  },
  {
    q: 'What certifications does AI Nexus hold?',
    a: 'None yet, and we say so plainly. The standards listed on our platform pages are capability statements describing what the software implements, not certification logos. We will publish certificates when they exist.',
  },
  {
    q: 'What happens if an AI agent produces something wrong?',
    a: 'It should not reach anyone. Legal citations are verified against Indian Kanoon and removed if unresolvable; school answers carry the textbook page they came from; extracted facts must match a verbatim quote in the source or they are dropped. Beyond that, no agent files, prescribes, sends or bills on its own: a human approves first, and every invocation is logged.',
  },
  {
    q: 'Can an AI agent be switched off?',
    a: 'Yes, individually. Each agent has its own kill switch: one flag, per institution, with no deployment and no support ticket.',
  },
];

/* ── /privacy/ ──────────────────────────────────────────────────────────── */
export const privacy: Section[] = [
  {
    h: 'What this site collects',
    body: [
      'This is a static marketing site. It sets no cookies, runs no advertising or analytics trackers, and does not profile visitors. Our web server keeps standard access logs (IP address, timestamp, requested URL, user agent) for security and to understand which search and AI crawlers reach us.',
      'If you use the contact form or email us, we hold your name, organisation, email address, phone number and message for the sole purpose of replying to you and, if you ask for one, arranging a demonstration. We do not sell this information, share it with advertisers, or add you to a marketing list you did not ask for.',
    ],
  },
  {
    h: 'Where data is held',
    body: [
      'This site and all four platforms run in AWS Mumbai (ap-south-1). Data does not leave India in normal operation.',
    ],
  },
  {
    h: 'Your rights',
    body: [
      'Under the Digital Personal Data Protection Act 2023 you may ask what personal data we hold about you, ask us to correct it, and ask us to erase it. Write to raju@ainexushub.ai and we will respond within one business day.',
    ],
  },
  {
    h: 'Status of this document',
    body: [
      'This is a plain-language description of what we actually do. Our formal privacy policy and data-processing terms are being finalised with counsel, and this page will be replaced by them. We would rather publish an accurate short statement now than a long one we have not checked.',
    ],
  },
];

/* ── /terms/ ────────────────────────────────────────────────────────────── */
export const terms: Section[] = [
  {
    h: 'About the content on this site',
    body: [
      'This site describes software we build. It is informational and does not form part of any contract, offer or warranty. Product capabilities, module counts, agent counts and compliance statements describe what the software implements at the time of writing and may change as the products develop.',
      '**Examples are illustrative.** The worked examples shown throughout this site demonstrate how a capability is used. They are not recordings of real patients, students, clients or transactions, and no real person’s data appears anywhere on this site.',
    ],
  },
  {
    h: 'Compliance statements',
    body: [
      'Where we list standards (ABDM, FHIR R4, NHCX, eCourts v3.0, BSA §63, DPDP Act 2023, WCAG 2.1 AA and others), these are capability statements describing what the software implements. They are not certification logos and should not be read as claims that a certification has been awarded. We publish certificates when they exist.',
    ],
  },
  {
    h: 'Nothing here is professional advice',
    body: [
      'Content on this site is not medical, legal, educational or property advice. Our platforms assist qualified professionals; they do not replace their judgment, and every platform requires a human to approve before an AI-assisted output is acted on.',
    ],
  },
  {
    h: 'Intellectual property',
    body: [
      'The name AI Nexus Innovations Hub, the product names MedOrbit, Edvation, AdvoHub and TrustProperty, and the content of this site belong to us. Third-party names appearing on this site belong to their respective owners.',
    ],
  },
  {
    h: 'Governing law',
    body: [
      'Use of this website is governed by the laws of India, with the courts at Bengaluru, Karnataka having jurisdiction.',
    ],
  },
  {
    h: 'Status of this document',
    body: [
      'Our formal website terms are being finalised with counsel and will replace this page. We would rather publish an accurate short statement now than a long one we have not checked.',
    ],
  },
];

/* ── /about/ ────────────────────────────────────────────────────────────── */
export const aboutIntro =
  'AI Nexus Innovations Hub is an AI product company incorporated in Bengaluru, India and Singapore that builds four AI-native platforms for regulated Indian industries: MedOrbit for hospitals, Edvation for K-12 schools, AdvoHub for legal practice, and TrustProperty for property.';

export const aboutBody = [
  'AI Nexus Innovations Hub was founded in 2025 to bring AI-native software to four industries that touch the most lives (healthcare, education, law and property), starting with India, where the gap between how these institutions work and what their software supports is widest.',
  'We are a product company, not a consultancy. We build, operate and support all four platforms end to end, from Bengaluru and Singapore.',
  'We also try to be careful about what we claim. Our platforms publish capability statements rather than certification logos, label illustrative examples as illustrative, and decline to quote figures we have not measured. That is a deliberate choice in a market where badge walls are the norm.',
];

/* Per-product policy links, used on /privacy/ and /terms/. */
export const productLegal = (kind: 'privacy' | 'terms') =>
  [
    { name: 'MedOrbit', sub: 'Hospital operating system', href: `https://www.medorbit.ai/${kind}` },
    { name: 'Edvation', sub: 'K-12 school operating system', href: `https://www.edvation.ai/${kind}` },
    { name: 'AdvoHub', sub: 'Legal practice platform', href: `https://www.advohub.ai/${kind}` },
    { name: 'TrustProperty', sub: 'Property marketplace with AI', href: `https://www.trustproperty.ai/${kind}` },
  ];
