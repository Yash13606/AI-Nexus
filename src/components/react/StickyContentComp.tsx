/** Sticky Content Wrapper — Hyperiux Vault (https://vault.hyperiux.com),
 *  ported to this codebase.
 *
 *  The timeline is the original: for each step, the current copy fades out and
 *  lifts by `contentExitYPercent`, the next copy fades in from
 *  `contentEnterYPercent` after `contentDelay`, and across the whole step the
 *  current image is wiped away with `clip-path: inset(0 0 100% 0)` while it
 *  scales down and the next scales up. Scroll is snapped to each step, with
 *  Lenis stopped for the duration of the snap so the two do not fight.
 *
 *  FOUR CHANGES FROM THE VAULT SOURCE, each because this site has a rule the
 *  component does not know about:
 *
 *  1. `items[].body` is a rendered node, not heading/paragraph/list/link. The
 *     copy for this section is a worked example — an Evidence Card, which is
 *     the most-used component on the site — and re-implementing its markup here
 *     would give it a second definition that drifts. It is rendered by Astro and
 *     handed in.
 *
 *  2. The panels are NOT `opacity-0` in the markup. In the original every panel
 *     but the first is transparent from first paint, so with JavaScript off the
 *     section is four invisible panels. The hidden state is applied by the
 *     effect, via `data-ready`, so no-JS and crawlers get all four as a plain
 *     stacked list — which is a ship gate here, not a preference.
 *
 *  3. Reduced motion bails out completely rather than crossfading in place.
 *     The original still swaps content on scroll under `reduce`; content that
 *     appears and disappears as you scroll is the thing that setting asks for
 *     less of. Same for a window too short to hold a panel, which would clip
 *     the worked example rather than scroll it.
 *
 *  4. Lenis drives ScrollTrigger. Without `lenis.on('scroll', update)` the two
 *     keep separate ideas of the scroll position and every trigger fires late.
 */
import React, { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLenis } from 'lenis/react';

gsap.registerPlugin(ScrollTrigger);

export interface StickyItem {
  /** Rendered by Astro and passed through — see note 1 above. */
  body?: React.ReactNode;
  image?: string;
  alt?: string;
  width?: number;
  height?: number;
}

interface Props {
  items?: StickyItem[];
  className?: string;
  leftClassName?: string;
  rightClassName?: string;
  contentClassName?: string;
  imageClassName?: string;
  containerHeight?: string;
  contentEnterYPercent?: number;
  contentExitYPercent?: number;
  contentTransitionDuration?: number;
  contentDelay?: number;
  stepGap?: number;
  enableImageScaleFlow?: boolean;
  initialImageScale?: number;
  activeImageScale?: number;
  exitImageScale?: number;
  /** Fires with the active index so the caller can drive a step counter. */
  onStep?: (index: number) => void;
  /** Rendered inside the sticky box, so it travels with the pin instead of
   *  being positioned against the viewport. */
  footer?: React.ReactNode;
  /** The section heading, rendered at the TOP of the sticky box so it stays on
   *  screen while the evidence changes beneath it — which is the whole premise
   *  of this pattern, and was not true while the heading sat above the track
   *  and scrolled away before the first panel arrived. */
  header?: React.ReactNode;
}

/** Wide enough for the two-column split, tall enough to hold a whole panel —
 *  and not absurdly tall, which is the signature of a full-page screenshot tool
 *  resizing the viewport to the document height.
 *
 *  THE 800 IS MEASURED, not chosen. The four panels need 589 / 589 / 733 / 612
 *  CSS pixels; AdvoHub is the tall one because its worked example is a citation
 *  that fails closed and the Control row runs to three lines. At the inherited
 *  700px floor that panel overflowed its box by 53px and the bottom of the
 *  Control row was cut — which is exactly the failure the Vault component's own
 *  brief warns about: the sticky column must not overlap content or disappear
 *  before the supporting material has finished. A window between 700 and 799
 *  tall now gets the stacked list, where nothing is clipped. */
const CAN_PIN = '(min-width: 1025px) and (min-height: 780px) and (max-height: 1600px)';

export function StickyContentComp({
  items = [],
  className = '',
  leftClassName = '',
  rightClassName = '',
  contentClassName = '',
  imageClassName = '',
  containerHeight,
  contentEnterYPercent = 12,
  contentExitYPercent = -12,
  contentTransitionDuration = 0.8,
  contentDelay = 0.28,
  stepGap = 2,
  enableImageScaleFlow = true,
  initialImageScale = 1.5,
  activeImageScale = 1.2,
  exitImageScale = 1,
  onStep,
  footer,
  header,
}: Props) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const stickyRef = useRef<HTMLDivElement | null>(null);
  const contentRefsRef = useRef<(HTMLDivElement | null)[]>([]);
  const imageRefsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [ready, setReady] = useState(false);
  const lenis = useLenis();

  /* Lenis owns the scroll position once it is running, so ScrollTrigger has to
     read from it rather than from the window. Without this the wipe lags the
     pointer by a frame or two at every step. */
  useLayoutEffect(() => {
    if (!lenis) return;
    const update = () => ScrollTrigger.update();
    lenis.on('scroll', update);
    return () => lenis.off('scroll', update);
  }, [lenis]);

  useLayoutEffect(() => {
    if (!sectionRef.current || !stickyRef.current || !items.length) return;

    /* Both bails leave the component rendering its plain stacked list: every
       panel in normal flow, nothing transparent, nothing pinned. */
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const mq = matchMedia(CAN_PIN);
    let context: gsap.Context | null = null;

    const build = () => {
      setReady(true);
      context = gsap.context(() => {
        const contents = contentRefsRef.current;
        const images = imageRefsRef.current;

        contents.forEach((content, index) => {
          gsap.set(content, {
            autoAlpha: index === 0 ? 1 : 0,
            yPercent: index === 0 ? 0 : contentEnterYPercent,
            zIndex: items.length - index,
          });
        });

        images.forEach((image, index) => {
          gsap.set(image, {
            autoAlpha: 1,
            zIndex: items.length - index,
            clipPath: 'inset(0% 0% 0% 0%)',
            scale: enableImageScaleFlow
              ? index === 0
                ? activeImageScale
                : initialImageScale
              : 1,
            transformOrigin: 'center center',
          });
        });

        const totalTimelineDuration = Math.max(1, (items.length - 1) * stepGap);
        const snapValues =
          items.length > 1
            ? Array.from({ length: items.length }, (_, index) => index / (items.length - 1))
            : [0];

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (!onStep) return;
              const steps = items.length - 1;
              onStep(Math.min(steps, Math.floor(self.progress * steps + 0.35)));
            },
            snap:
              items.length > 1
                ? {
                    snapTo: snapValues,
                    duration: { min: 0.2, max: 0.5 },
                    ease: 'power2.inOut',
                    delay: 0,
                    inertia: false,
                    onStart: () => lenis?.stop(),
                    onComplete: () => lenis?.start(),
                  }
                : /* `false` is what the upstream reference passed, but
                     ScrollTrigger types snap as SnapVars | undefined — the
                     way to mean "no snapping" is to omit it. */
                  undefined,
          },
        });

        items.forEach((_, index) => {
          if (index === items.length - 1) return;

          const currentContent = contents[index];
          const nextContent = contents[index + 1];
          const currentImage = images[index];
          const nextImage = images[index + 1];
          const stepStart = index * stepGap;
          const nextContentStart = stepStart + contentTransitionDuration + contentDelay;

          timeline
            .to(
              currentContent,
              {
                autoAlpha: 0,
                yPercent: contentExitYPercent,
                duration: contentTransitionDuration,
                ease: 'power2.inOut',
              },
              stepStart
            )
            .fromTo(
              nextContent,
              { autoAlpha: 0, yPercent: contentEnterYPercent },
              {
                autoAlpha: 1,
                yPercent: 0,
                duration: contentTransitionDuration,
                ease: 'power2.inOut',
              },
              nextContentStart
            )
            .to(
              currentImage,
              {
                clipPath: 'inset(0% 0% 100% 0%)',
                scale: enableImageScaleFlow ? exitImageScale : 1,
                duration: stepGap,
                ease: 'none',
              },
              stepStart
            );

          if (enableImageScaleFlow) {
            timeline.to(
              nextImage,
              { scale: activeImageScale, duration: stepGap, ease: 'none' },
              stepStart
            );
          }
        });

        timeline.duration(totalTimelineDuration);
        ScrollTrigger.refresh();
      }, sectionRef);
    };

    const teardown = () => {
      context?.revert();
      context = null;
      setReady(false);
      /* revert() puts back the inline styles it found, which for the stacked
         fallback is none — clear them so the list is plain again. */
      [...contentRefsRef.current, ...imageRefsRef.current].forEach((el) => {
        if (!el) return;
        el.style.cssText = '';
      });
      lenis?.start();
    };

    const sync = () => (mq.matches ? !context && build() : context && teardown());
    sync();
    mq.addEventListener('change', sync);

    return () => {
      mq.removeEventListener('change', sync);
      teardown();
    };
  }, [
    items,
    lenis,
    onStep,
    contentEnterYPercent,
    contentExitYPercent,
    contentTransitionDuration,
    contentDelay,
    stepGap,
    enableImageScaleFlow,
    initialImageScale,
    activeImageScale,
    exitImageScale,
  ]);

  if (!items.length) return null;

  return (
    <div
      ref={sectionRef}
      className={`scw ${className}`}
      data-ready={ready ? '' : undefined}
      style={ready ? { height: containerHeight || `${items.length * 100}vh` } : undefined}
    >
      <div ref={stickyRef} className="scw-sticky">
        {header && <div className="scw-head">{header}</div>}

        <div className="scw-cols">
        <div className={`scw-left ${leftClassName}`}>
          {items.map((item, index) => (
            <div
              key={`content-${index}`}
              ref={(element) => {
                contentRefsRef.current[index] = element;
              }}
              className={`scw-content ${contentClassName}`}
            >
              {item.body}
            </div>
          ))}
        </div>

        <div className={`scw-right ${rightClassName}`}>
          {items.map((item, index) => (
            <div
              key={`image-${index}`}
              ref={(element) => {
                imageRefsRef.current[index] = element;
              }}
              className={`scw-image ${imageClassName}`}
            >
              {item.image && (
                <img
                  src={item.image}
                  alt={item.alt || ''}
                  width={item.width || 1600}
                  height={item.height || 894}
                  decoding="async"
                  /* The section sits well below the fold on every route that
                     renders it, and the island itself is client:visible — so
                     the four photographs should not be on the critical path
                     either. They have a real box from width/height, which is
                     what lazy loading needs to have something to observe. */
                  loading="lazy"
                />
              )}
            </div>
          ))}
        </div>

        </div>

        {footer}
      </div>
    </div>
  );
}

export default StickyContentComp;
