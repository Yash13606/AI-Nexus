import type { Platform } from './platforms';

export type Solution = {
  slug: 'hospitals' | 'schools' | 'law-firms' | 'property';
  platform: Platform['slug'];
  /** Page H1. The live site renders these lowercase ("hospitals run on
   *  MedOrbit") — a template artifact, not a voice choice. Corrected. */
  h1: string;
  title: string;
  seats: string;
  /** Which roles carry an inline worked example, and from which agent.
   *  Taken from the live pages, not invented. */
  evidence: Record<string, string>;
};

export const solutions: Solution[] = [
  {
    slug: 'hospitals',
    platform: 'medorbit',
    h1: 'Hospitals run on MedOrbit',
    title: 'AI for hospitals — MedOrbit | AI Nexus',
    seats:
      'Doctors, nurses, lab, pharmacy, front office, billing and administrators — plus a separate patient portal.',
    evidence: {
      Doctor: 'AI Scribe',
      Receptionist: 'Front-Desk Voice Agent',
      Billing: 'Denial Guard',
      Patient: 'Result Explainer',
    },
  },
  {
    slug: 'schools',
    platform: 'edvation',
    h1: 'Schools run on Edvation',
    title: 'AI for schools — Edvation | AI Nexus',
    seats:
      'Students, teachers, parents, principals and administrators, on one platform with six role views.',
    evidence: {
      Student: 'Study Mentor',
      Teacher: 'Teacher Lesson Kit',
      Principal: 'Ask School Copilot',
    },
  },
  {
    slug: 'law-firms',
    platform: 'advohub',
    h1: 'Law firms run on AdvoHub',
    title: 'AI for law firms — AdvoHub | AI Nexus',
    seats: 'Nine seats from intern to managing partner, plus a client portal with its own authentication.',
    evidence: {
      'Senior associate': 'Citation-Grounded Research',
      Associate: 'Citation-Grounded Research',
      'Junior associate': 'Citation-Grounded Research',
      'Front desk': 'Vernacular Voice & WhatsApp Intake',
    },
  },
  {
    slug: 'property',
    platform: 'trustproperty',
    h1: 'Property runs on TrustProperty',
    title: "AI for property — TrustProperty | AI Nexus",
    seats:
      'Buyers and tenants, owners, agents and agencies, builders, service professionals and societies.',
    evidence: {
      'Buyer or tenant': 'TrustLine Concierge',
      'Owner or seller': 'TrustLine Concierge',
      'Agent or agency': 'Lead Intelligence',
    },
  },
];

export const solutionFor = (p: Platform['slug']) => solutions.find((s) => s.platform === p)!;
