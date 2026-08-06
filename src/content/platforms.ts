export type Evidence = { tag: string; input: string; output: string; control: string };
export type Stat = { figure: string; label: string };

/** Hero composition. The architecture is identical on all four pages —
 *  eyebrow, h1, lede, CTA, stat strip — and only the arrangement varies, so the
 *  four detail pages read as a family rather than one template five times.
 *
 *  `mock-below` was specified as `centred-mock-below`. The mock is centred and
 *  full-width; the TEXT is not. §8.5 says the hero is "left-aligned, never
 *  centered" and §11 says don't centre a heading or body copy — §8.18 makes the
 *  CTA band "the only centered block in the system". Raised rather than
 *  silently broken. */
export type HeroLayout = 'mock-below' | 'left-mock-right' | 'left-narrow-refs-right' | 'split';

/** How the module list is presented. Assigned so no two adjacent siblings in
 *  comparison-table order share one. */
export type CapabilityLayout = 'bento' | 'tabs' | 'alternating' | 'showcase';

/** How the role list is presented. Second axis of variation, so two pages can
 *  share a capability layout without reading as the same page. */
export type RolesLayout = 'grid' | 'bento' | 'spotlight' | 'alternating';

/** Where `stats` renders. Same four figures and the same four labels either
 *  way — this moves them, it does not add any. In the hero they are a strip
 *  under the CTA; as a band they are a mid-page object with count-up on the
 *  figures that are plain integers. */
export type StatsPlacement = 'hero' | 'band';

/** Page-level patterns that are not layouts. §16 allows three motion patterns
 *  per page and these are counted toward that budget, which is why they are
 *  declared in content rather than switched on wherever they would look nice. */
export type PageMotion = {
  /** Decorative lockup strip. aria-hidden — the four names are already linked
   *  in the siblings grid, so this adds no reachable content and no new link. */
  marquee?: true;
  magneticCta?: true;
  /** Scroll parallax on alternating rows. Capped at 40px, transform only. */
  parallax?: true;
};

export type Platform = {
  slug: 'medorbit' | 'edvation' | 'advohub' | 'trustproperty';
  /** Union-typed: an invalid value is a build error, not a silent fallback. */
  heroLayout: HeroLayout;
  capabilityLayout: CapabilityLayout;
  rolesLayout: RolesLayout;
  statsPlacement: StatsPlacement;
  motion: PageMotion;
  name: string;
  sector: string;
  hue: string;
  subtitle: string;
  site: string;
  /** Platform-page hero */
  pageTitle: string;
  pageH1: string;
  pageLede: string;
  agentCount: number;
  /** Platform-card bullets */
  bullets: string[];
  /** Alternating product row */
  headline: string;
  body: string;
  features: { title: string; body: string }[];
  stats: Stat[];
  /** Dark timeline panel */
  panel: { title: string; rows: { when: string; what: string; outcome: string }[]; note: string };
  evidence: Evidence;
};

export const platforms: Platform[] = [
  {
    slug: 'medorbit',
    heroLayout: 'mock-below',
    capabilityLayout: 'showcase',
    rolesLayout: 'spotlight',
    statsPlacement: 'hero',
    motion: { magneticCta: true },
    name: 'MedOrbit',
    sector: 'Healthcare',
    hue: 'var(--color-medorbit)',
    subtitle: 'Hospital operating system',
    site: 'https://www.medorbit.ai',
    pageTitle: "MedOrbit — AI Hospital Management System for India | AI Nexus",
    pageH1: "The AI-native hospital operating system, built for India",
    pageLede: "MedOrbit is an AI-native hospital management system built for 23 types of Indian healthcare facility, from solo clinics to hospital chains. It runs the front office, clinical records, diagnostics, pharmacy, revenue cycle and inpatient governance as one platform with over 100 modules, and adds 11 AI agents that take work off the staff rota — answering calls, calling discharged patients, drafting notes, explaining results and appealing denied claims. Every AI action is PHI-redacted before it reaches a model, logged to an audit trail, and gated behind a human approval.",
    agentCount: 11,
    bullets: [
      '11 AI agents, including a voice front desk',
      '100+ modules, from OPD to mortuary',
      'ABDM-native, NHCX cashless claims',
    ],
    headline: 'Run your hospital. Staff it with AI.',
    body: 'MedOrbit runs OPD, IPD, lab, pharmacy, billing and 100+ modules on one platform, with 11 AI agents that answer patient calls, follow up after discharge, draft clinical notes and fight claim denials. Every AI action is PHI-redacted, audit-logged and approved by your staff. The platform ships as 23 facility-type editions, each with its own preset modules, seeded role catalogue and regulatory checklist.',
    features: [
      {
        title: 'AI that answers the phone',
        body: "A front-desk voice agent takes calls in the hospital's name after hours and books into the live schedule. An aftercare agent calls every discharged patient on day 2 and day 7 — and escalates to your staff rather than advising.",
      },
      {
        title: 'Specialties are editions, not separate products',
        body: '23 facility types — solo clinic to hospital chain, dental to IVF to blood bank — each with preset modules and a seeded role catalogue, all sharing one data model.',
      },
      {
        title: 'Safety enforced in the platform, not in policy',
        body: 'PHI redacted before every model call, clinician sign-off before anything enters the record, per-facility cost caps, and a per-agent kill switch that takes one flag and no deployment.',
      },
    ],
    stats: [
      { figure: '11', label: 'AI agents' },
      { figure: '23', label: 'facility-type editions' },
      { figure: '100+', label: 'modules' },
      { figure: 'ap-south-1', label: 'data residency' },
    ],
    panel: {
      title: 'A day with the agents',
      rows: [
        { when: '08:00', what: 'Queue Concierge', outcome: 'OPD queue messaged, live waits' },
        { when: '09:15', what: 'Pre-Consult Brief', outcome: 'Patient-360 in 10 seconds' },
        { when: '11:00', what: 'Referral Triage', outcome: 'Urgent · missing ECG requested' },
        { when: '16:00', what: 'Denial Guard', outcome: '2 appeals drafted · biller approved' },
      ],
      note: 'Illustrative sequence — every step is a shipped capability',
    },
    evidence: {
      tag: 'Worked example · Front-Desk Voice Agent',
      input: 'A patient calls at 20:40, after the front desk has closed.',
      output:
        "The agent answers in the hospital's name, offers the next three orthopaedics slots, and writes the booking into the live schedule.",
      control: 'Booking tools are cryptographically signed; every call is logged.',
    },
  },
  {
    slug: 'edvation',
    heroLayout: 'left-mock-right',
    capabilityLayout: 'tabs',
    rolesLayout: 'bento',
    statsPlacement: 'band',
    motion: {},
    name: 'Edvation',
    sector: 'Education',
    hue: 'var(--color-edvation)',
    subtitle: 'K-12 school operating system',
    site: 'https://www.edvation.ai',
    pageTitle: "Edvation — AI K-12 School Platform for India | AI Nexus",
    pageH1: "The AI-powered operating system for K-12 schools",
    pageLede: "Edvation is a complete school platform for Indian K-12 education — admissions, attendance, fees, timetable, assessments, report cards and parent communication — with 20 built-in AI agents that teach from the school's own uploaded textbooks. Every AI answer is page-cited, works for any board, and is available in 13 Indian languages. Because the school supplies its own books rather than licensing a bundled library, board coverage is not a constraint: CBSE, ICSE and ISC, IB, Cambridge and every state board are supported by construction.",
    agentCount: 20,
    bullets: [
      '20 AI agents grounded in your own textbooks',
      'Page-cited answers in 13 Indian languages',
      'Any board — you upload the syllabus',
    ],
    headline: 'AI that teaches from your textbook.',
    body: "Edvation is a complete school platform for Indian K-12 education — admissions, attendance, fees, timetable, assessments, report cards and parent communication — with 20 AI agents that teach from the school's own uploaded textbooks. Every AI answer carries the page number it came from, so a child, a parent or a teacher can open the printed book and check it. There is no bundled content library to outgrow: any board works, because you supply the syllabus.",
    features: [
      {
        title: 'Answers with page numbers, not guesses',
        body: 'Upload any textbook or PDF; every chapter is indexed; every agent answers with a page citation. If it is not in your book, the platform says so.',
      },
      {
        title: 'Refusal as a feature',
        body: 'Socratic Practice gives an L1–L3 hint ladder and then flags the teacher rather than handing over the answer. Writing Coach declines to ghostwrite and coaches instead.',
      },
      {
        title: 'AI on a real school OS, not beside one',
        body: '640+ screens of admissions, attendance, gradebook, fees, assessments and proctoring underneath, so the school copilot answers from live operational data.',
      },
    ],
    stats: [
      { figure: '20', label: 'AI agents' },
      { figure: '13', label: 'Indian languages' },
      { figure: '110+', label: 'AI capabilities' },
      { figure: '640+', label: 'screens' },
    ],
    panel: {
      title: 'Teacher dashboard — today',
      rows: [
        { when: '09:20', what: 'Class 9B · essays', outcome: 'Coached · 4 flagged for review' },
        { when: '11:05', what: 'Quiz · Ch. 12', outcome: '20 questions · Bloom-tagged' },
        { when: '13:40', what: 'Socratic · stuck-flag', outcome: '3 students, same step' },
        { when: '15:10', what: 'Answer cited', outcome: 'Science · Ch 4 · p. 87' },
      ],
      note: 'Illustrative — every answer carries its page number',
    },
    evidence: {
      tag: 'Worked example · Study Mentor',
      input: 'A student asks why the reaction is exothermic.',
      output:
        "An answer drawn from the school's own uploaded book, citing Science · Ch 4 · p. 87.",
      control: 'If it is not in your book, the platform says so rather than guessing.',
    },
  },
  {
    slug: 'advohub',
    heroLayout: 'left-narrow-refs-right',
    capabilityLayout: 'showcase',
    rolesLayout: 'alternating',
    statsPlacement: 'hero',
    motion: { parallax: true },
    name: 'AdvoHub',
    sector: 'Legal',
    hue: 'var(--color-advohub)',
    subtitle: 'Legal practice platform',
    site: 'https://www.advohub.ai',
    pageTitle: "AdvoHub — AI Legal Practice Platform for India | AI Nexus",
    pageH1: "The AI practice platform for Indian advocates and law firms",
    pageLede: "AdvoHub is an AI-native legal practice platform for Indian advocates and law firms. Twelve modules cover an Indian engagement end to end — from intake and KYC through research, drafting, evidence and court operations to GST-correct invoicing and trust accounting — and ten purpose-built AI agents each take one job an advocate would otherwise do personally. Every agent operates under the same non-negotiable constraints: citations verified against Indian Kanoon before display, DPDP consent gated fail-closed before client data reaches a model, BCI Rule 36 disclosure on every AI-assisted output, and a human approval before anything is filed.",
    agentCount: 10,
    bullets: [
      '10 AI agents, each with its own guardrails',
      'Every citation verified against Indian Kanoon',
      'eCourts sync by CNR, GST billing in paise',
    ],
    headline: 'The AI copilot built for Indian lawyers.',
    body: 'AdvoHub syncs matters from eCourts by CNR, drafts in 22 Indian languages, and bills in paise-precise GST — with every AI citation verified against Indian Kanoon before it reaches an advocate. Twelve modules cover an Indian engagement from intake to invoice, and ten purpose-built agents each carry their own guardrails, their own audit trail and their own cost ceiling in rupees.',
    features: [
      {
        title: 'Ten agents, not one chatbot',
        body: 'Each agent does one job an advocate would otherwise do personally — research, hearing prep, drafting, contract review, evidence review, billing narration — with its own constraints.',
      },
      {
        title: 'Citations that fail closed',
        body: 'Every cited judgment is checked against Indian Kanoon and the citation graph. An authority that cannot be resolved is removed from the answer, and the answer says so — never rendered with a caveat.',
      },
      {
        title: 'The Indian legal stack, computed',
        body: 'Limitation Act deadlines computed rather than remembered, BSA §63 evidence certificates with hash-chained custody, court fees against the schedule in force on the filing date.',
      },
    ],
    stats: [
      { figure: '10', label: 'AI agents' },
      { figure: '12', label: 'modules, intake to invoice' },
      { figure: '22', label: 'Indian languages' },
      { figure: '9', label: 'roles, plus a client portal' },
    ],
    panel: {
      title: "Tomorrow's cause list",
      rows: [
        { when: '10:30', what: 'CNR · Karnataka HC', outcome: 'Item 14 · Court Hall 7' },
        { when: '12:00', what: 'Draft · rejoinder', outcome: '6 citations · all verified' },
        { when: '14:15', what: 'Citation unresolved', outcome: 'Removed from answer' },
        { when: '17:00', what: 'Limitation · NI Act §138', outcome: '9 days remaining' },
      ],
      note: 'Illustrative — unverifiable citations are stripped, not caveated',
    },
    evidence: {
      tag: 'Worked example · Citation-Grounded Research',
      input:
        '"Can a director who resigned before the cheque was issued be held vicariously liable under Section 141 of the NI Act? Supreme Court and Delhi High Court only."',
      output:
        'An answer composed with per-claim citations. One authority cannot be resolved, so it is removed — and the answer says so.',
      control:
        'Fail-closed: an unverifiable authority is removed, never rendered with a caveat. Overruled or doubted judgments are flagged, not quietly cited.',
    },
  },
  {
    slug: 'trustproperty',
    heroLayout: 'split',
    capabilityLayout: 'bento',
    rolesLayout: 'alternating',
    statsPlacement: 'hero',
    motion: { marquee: true, magneticCta: true },
    name: 'TrustProperty',
    sector: 'Property',
    hue: 'var(--color-trustproperty)',
    subtitle: 'Property marketplace with AI',
    site: 'https://www.trustproperty.ai',
    pageTitle: "TrustProperty — India's AI Property Platform | AI Nexus",
    pageH1: "India's AI-native property platform",
    pageLede: "TrustProperty is an AI-native property platform for India covering buying, renting, PG and co-living, plots and commercial space, with zero brokerage for consumers. Its distinguishing feature is TrustLine: an AI concierge attached to every individual listing that answers from that listing's own verified facts in text or real-time voice, in English, हिंदी or Hinglish, and books the site visit into the owner's live calendar. Around it sit six more agents for lead intelligence, listing intake, photo enrichment, lead merging, pipeline monitoring and advertising — and a set of human services including lawyer-reviewed title verification.",
    agentCount: 7,
    bullets: [
      'TrustLine answers on every listing, 24×7',
      'Voice and chat in English, हिंदी and Hinglish',
      'Lawyer-verified title checks from ₹1,499',
    ],
    headline: 'Find your home. Just ask TrustLine.',
    body: 'TrustProperty is an AI-native property platform for India where every listing answers you — in text or voice, in English, हिंदी or Hinglish, at any hour. Seven AI agents run the marketplace: a concierge that answers from the listing’s own verified facts and books the site visit, lead scoring that shows its reasoning, voice-dictated listing intake, and a pipeline watchdog for agents. Legal title verification sits alongside it, reviewed by a qualified lawyer rather than an automated scan.',
    features: [
      {
        title: 'Every home answers you',
        body: "TrustLine is attached to each individual listing, answers only from that listing's verified facts, handles real-time voice with interruption, and books into the owner's live calendar mid-conversation.",
      },
      {
        title: 'Explainability as a product surface',
        body: 'Every lead score ships its factor breakdown, every price estimate its comparables, every AI reply a note explaining why it said that.',
      },
      {
        title: 'Lawyer-verified, deliberately not automated',
        body: 'Title verification is reviewed by a qualified lawyer with a risk-graded verdict and a digitally-signed report — an explicit counter-position to AI-only title checks.',
      },
    ],
    stats: [
      { figure: '7', label: 'AI agents live' },
      { figure: '3', label: 'languages: English, हिंदी, Hinglish' },
      { figure: '8', label: 'launch cities' },
      { figure: '₹0', label: 'brokerage' },
    ],
    panel: {
      title: 'TrustLine — 23:40',
      rows: [
        { when: '23:40', what: 'Tenant asks about deposit', outcome: 'Answered from listing' },
        { when: '23:41', what: 'Language', outcome: 'Hinglish · voice' },
        { when: '23:43', what: 'Owner calendar checked', outcome: 'Saturday 11:00 booked' },
        { when: '23:44', what: 'Lead scored', outcome: '82/100 · reasons shown' },
      ],
      note: "Illustrative — TrustProperty's own worked example",
    },
    evidence: {
      tag: 'Worked example · TrustLine Concierge',
      input: 'At 11:40 PM a tenant asks about the deposit.',
      output:
        "TrustLine answers from the listing — text or voice, English, हिन्दी or Hinglish — checks the owner's calendar, and books Saturday 11 AM.",
      control:
        'Answers only from that listing’s verified facts, with a note explaining why it said what it said.',
    },
  },
];

export const byslug = Object.fromEntries(platforms.map((p) => [p.slug, p]));
