/**
 * ScrollSpread — "One screen, four institutions"
 *
 * Direct port of the code.zip animation into React + the project's GSAP install.
 * Exact numbers from code.zip/script.js and code.zip/styles.css preserved verbatim:
 *
 *   Card size:      300 × 450 px  (.card in styles.css)
 *   Pin scroll:     window.innerHeight × 3  (totalScrollHeight)
 *   Spread to left: [14, 38, 62, 86]%      (positions array)
 *   Rotations:      [-15, -7.5, 7.5, 15]°  (rotations array)
 *   Spread end:     += 1 × window.innerHeight  (first third of pin)
 *   Flip phase:     second + third thirds, staggered 0.05 per card
 *
 * The flip reveals the card back with platform content (name, agent count,
 * headline) replacing the code.zip placeholder text.
 *
 * Floating animation: each card gently bobs (0 → -10px → 0) on a 3s loop
 * with staggered delays — straight from the @keyframes floating in styles.css.
 *
 * prefers-reduced-motion: skips all GSAP, renders a static grid.
 */

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { platforms } from '../../content/platforms';

gsap.registerPlugin(ScrollTrigger);

// Exact values from code.zip/script.js
const POSITIONS  = [14, 38, 62, 86];         // left %
const ROTATIONS  = [-15, -7.5, 7.5, 15];     // degrees

// Exact floating delays from code.zip/styles.css
const FLOAT_DELAYS = [0, 0.2, 0.4, 0.6];    // seconds

// ─── Card inner ───────────────────────────────────────────────────────────────
// Structure mirrors the original:  .card > .card-wrapper > .flip-card-inner
//                                              > .flip-card-front / .flip-card-back
function SpreadCard({
  platform,
  index,
}: {
  platform: (typeof platforms)[number];
  index: number;
}) {
  return (
    // .card — 300 × 450 px, absolutely positioned, same as the original
    <div
      className={`ssc-card platform-swap-card--${platform.slug}`}
      id={`ssc-card-${index}`}
      style={{ animationDelay: `${FLOAT_DELAYS[index]}s` } as React.CSSProperties}
    >
      {/* .card-wrapper — floating layer */}
      <div className="ssc-card-wrapper">
        {/* .flip-card-inner — preserve-3d */}
        <div className="ssc-flip-inner" id={`ssc-inner-${index}`}>

          {/* .flip-card-front — shown initially */}
          <div className="ssc-flip-front" id={`ssc-front-${index}`}>
            {/* Platform colour bar at the top (3px rule, same as other cards) */}
            <p
              className="ssc-front__eyebrow"
              style={{ color: platform.hue } as React.CSSProperties}
            >
              {platform.name} · {platform.sector}
            </p>
            <p className="ssc-front__headline">{platform.headline}</p>
          </div>

          {/* .flip-card-back — revealed after flip */}
          <div className="ssc-flip-back" id={`ssc-back-${index}`}>
            <p
              className="ssc-back__eyebrow"
              style={{ color: platform.hue } as React.CSSProperties}
            >
              {platform.name}
            </p>
            <p className="ssc-back__count mono">{platform.agentCount}</p>
            <p className="ssc-back__label">AI agents</p>
            <a className="ssc-back__link" href={`/platforms/${platform.slug}/`}>
              Explore {platform.name} →
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function ScrollSpread() {
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Honour prefers-reduced-motion — static grid, no GSAP
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const stage = stageRef.current;
    if (!stage) return;

    // Exact variable names from code.zip/script.js
    const cards            = gsap.utils.toArray<HTMLElement>('.ssc-card', stage);
    const totalScrollHeight = window.innerHeight * 3;

    // Track only the triggers this effect creates, so cleanup can't reach
    // past this component and kill some other section's ScrollTrigger too.
    const triggerIds: string[] = [];

    // 1. Pin the stage — exact replica of ScrollTrigger.create in script.js
    const pin = ScrollTrigger.create({
      trigger: stage,
      start: 'top top',
      end: () => `+=${totalScrollHeight}`,
      pin: true,
      pinSpacing: true,
    });

    // 2. Spread cards — scrub from top→top to += 1×vh  (first third of pin)
    cards.forEach((card, index) => {
      const id = `spread-${index}`;
      triggerIds.push(id);
      gsap.to(card, {
        left: `${POSITIONS[index]}%`,
        rotation: ROTATIONS[index],
        ease: 'none',
        scrollTrigger: {
          trigger: stage,
          start: 'top top',
          end: () => `+=${window.innerHeight}`,
          scrub: 0.5,
          id,
        },
      });
    });

    // 3. Flip cards — second + third thirds, staggered 0.05 per card
    //    Exact port of the onUpdate logic from code.zip/script.js
    cards.forEach((card, index) => {
      const frontEl = document.getElementById(`ssc-front-${index}`);
      const backEl  = document.getElementById(`ssc-back-${index}`);
      if (!frontEl || !backEl) return;

      const staggerOffset = index * 0.05;
      const startOffset   = 1 / 3 + staggerOffset;
      const endOffset     = 2 / 3 + staggerOffset;
      const id = `rotate-flip-${index}`;
      triggerIds.push(id);

      ScrollTrigger.create({
        trigger: stage,
        start: 'top top',
        end: () => `+=${totalScrollHeight}`,
        scrub: 1,
        id,
        onUpdate: (self) => {
          const progress = self.progress;
          if (progress >= startOffset && progress <= endOffset) {
            const animationProgress = (progress - startOffset) / (1 / 3);
            const frontRotation = -180 * animationProgress;
            const backRotation  = 180 - 180 * animationProgress;
            const cardRotation  = ROTATIONS[index] * (1 - animationProgress);

            frontEl.style.transform = `rotateY(${frontRotation}deg)`;
            backEl.style.transform  = `rotateY(${backRotation}deg)`;
            card.style.transform    = `translate(-50%, -50%) rotate(${cardRotation}deg)`;
          }
        },
      });
    });

    return () => {
      pin.kill();
      triggerIds.forEach((id) => ScrollTrigger.getById(id)?.kill());
    };
  }, []);

  return (
    // The stage is the element GSAP pins — 100vh, full width, same as .cards in the zip
    <div ref={stageRef} className="ssc-stage" aria-label="Platform cards">
      {platforms.map((p, i) => (
        <SpreadCard key={p.slug} platform={p} index={i} />
      ))}
    </div>
  );
}
