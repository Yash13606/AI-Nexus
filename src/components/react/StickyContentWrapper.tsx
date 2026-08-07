/** The island Astro mounts. Two jobs the inner component should not have:
 *
 *  ReactLenis — the usage this was given wraps the page in `<ReactLenis root>`.
 *  Mounted here it is still `root`, so it drives the document scroll, but it is
 *  only ever constructed on the one route that renders this section. The other
 *  17 routes keep the browser's own scrolling and pay nothing for it.
 *
 *  The step counter — `01 / 04`, bottom right. The Vault component ships a
 *  "scroll" hint with animated chevrons at a fixed viewport position; this
 *  section already had a counter in the same corner, and a counter says
 *  everything the hint does plus how far there is to go.
 */
import React, { useCallback, useState } from 'react';
import { ReactLenis } from 'lenis/react';
import { StickyContentComp, type StickyItem } from './StickyContentComp';

interface Props {
  items: StickyItem[];
  /** Astro hands each named slot through as a prop of the same name, so
   *  `slot="body-0"` arrives here as `props['body-0']` — already rendered
   *  HTML, including a real EvidenceCard. Not valid identifiers, hence the
   *  index signature and the bracket access below. */
  [slot: string]: unknown;
}

export default function StickyContentWrapper(props: Props) {
  const { items } = props;
  const header = props['header'] as React.ReactNode;
  const [step, setStep] = useState(0);
  const onStep = useCallback((index: number) => setStep(index), []);
  const pad = (n: number) => String(n).padStart(2, '0');

  const withBodies: StickyItem[] = items.map((item, index) => ({
    ...item,
    body: props[`body-${index}`] as React.ReactNode,
  }));

  return (
    <ReactLenis root>
      <StickyContentComp
        items={withBodies}
        header={header}
        onStep={onStep}
        footer={
          <p className="scw-progress mono t-cap" aria-hidden="true">
            <span className="scw-progress-current">{pad(step + 1)}</span>
            <span>/ {pad(items.length)}</span>
          </p>
        }
        contentEnterYPercent={2}
        contentExitYPercent={-2}
        contentTransitionDuration={0.9}
        contentDelay={0.35}
        stepGap={2.1}
        /* THE SCALE FLOW NEVER UPSCALES PAST 1.12 — because .scw-right clips,
         * and what it clips here is a line drawing of a person. The Vault
         * defaults (1.5 -> 1.2 -> 1) are built for photographs, where a crop
         * is just a tighter photograph and the drift is the point. Settled at
         * 1.2, these drawings were 20% wider than the half that holds them and
         * lost an arm at each edge; entering at 1.5 they lost more.
         *
         * Inverted instead: the incoming image settles DOWN from 1.12 to 1 and
         * the outgoing one keeps shrinking to 0.94. Same drift, same direction
         * of travel, but 1.0 is the resting size — so the size the artwork is
         * actually drawn for is the size it is read at, and the widest moment
         * in the timeline still fits inside the half. Checked against every
         * frame of the timeline, not just the settle points. */
        initialImageScale={1.12}
        activeImageScale={1}
        exitImageScale={0.94}
      />
    </ReactLenis>
  );
}
