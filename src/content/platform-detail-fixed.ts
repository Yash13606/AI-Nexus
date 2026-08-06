/** Corrections overlay for the GENERATED platform-detail.ts.
 *
 *  The generator (scripts/extract-platform-data.py — not in this repo) let the
 *  following "## Roles" section run into the LAST agent's `control` on each of
 *  the four platforms. TrustProperty additionally swallowed the whole
 *  "In development — not live today" list. The result renders inside the Mist
 *  well, which DESIGN.md §8.1 calls "the design's whole argument".
 *
 *  This overlay CUTS the swallowed tail and does nothing else. No prose is
 *  authored here: every corrected value is a strict prefix of the generated
 *  one, and is byte-identical to the `Control` line in ainexushub/.
 *  scripts/check-content.mjs asserts both on every build, so neither a
 *  regenerated platform-detail.ts nor an edit here can drift silently.
 *
 *  Delete this file when the generator is fixed — the sentinel assertion will
 *  fail and say so. */
import { detail as generated, type PlatformDetail } from './platform-detail';

/** agent slug → the first characters of the swallowed tail. */
const CUTS: Record<string, string> = {
  sahayak: ' Roles ', // medorbit
  'science-lab': ' Roles ', // edvation
  'firm-knowledge-agent': ' Roles ', // advohub
  'ad-factory': ' In development', // trustproperty
};

export const detail: Record<string, PlatformDetail> = Object.fromEntries(
  Object.entries(generated).map(([slug, d]) => [
    slug,
    {
      ...d,
      agents: d.agents.map((a) => {
        const cut = CUTS[a.slug];
        if (!cut) return a;
        const at = a.control.indexOf(cut);
        return at === -1 ? a : { ...a, control: a.control.slice(0, at) };
      }),
    },
  ])
);

export type { AgentDetail, Module, Role, Faq, PlatformDetail } from './platform-detail';
