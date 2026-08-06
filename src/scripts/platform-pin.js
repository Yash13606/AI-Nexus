/** Crossfades the platform panels inside #platform-pin as the track scrolls.
 *
 *  The hold is native CSS `position: sticky` on a tall track (see the
 *  PLATFORM PIN block in theme.css) — this module does NOT pin. GSAP only
 *  scrubs opacity between panels, so there is no pin-spacer, nothing
 *  fighting the stylesheet over height, and no way for a panel to escape
 *  the track and land on a neighbouring section.
 *
 *  Every panel is real content in the HTML already; this adds the overlay
 *  on top. It bails out (leaving the stacked fallback) under reduced
 *  motion, or when the viewport is too narrow or too SHORT to hold a full
 *  screen of panel — a 1280×600 window would otherwise clip the worked
 *  example. [data-pinned] is set only after those checks pass, and it is
 *  the only thing the pinned CSS is gated behind.
 */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/** Wide enough for the two-column split, tall enough to hold a whole panel
 *  without clipping — and not ABSURDLY tall, which is the signature of a
 *  full-page screenshot tool resizing the viewport to the document height.
 *  In that case 100vh stops meaning "a screen" and the pinned layout is
 *  meaningless, so we fall back to the stacked list and the capture shows
 *  every platform instead of one panel and three invisible ones. */
const CAN_PIN = '(min-width: 1025px) and (min-height: 700px) and (max-height: 1600px)';

export function initPlatformPin() {
  const track = document.getElementById('platform-pin');
  if (!track) return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const panels = gsap.utils.toArray('.pp-panel', track);
  if (panels.length < 2) return;

  const counter = track.querySelector('.pp-progress-current');
  const steps = panels.length - 1;
  let ctx = null;

  const build = () => {
    track.setAttribute('data-pinned', '');

    ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: track,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (!counter) return;
            const index = Math.min(steps, Math.floor(self.progress * steps + 0.35));
            counter.textContent = String(index + 1).padStart(2, '0');
          },
        },
      });

      // Each unit of timeline time is one screen of scroll: panel i holds
      // for the first 65% of it, then hands over to panel i + 1.
      panels.forEach((panel, index) => {
        if (index === steps) return;
        timeline
          .to(panel, { opacity: 0, duration: 0.35, ease: 'none' }, index + 0.65)
          .fromTo(
            panels[index + 1],
            { opacity: 0 },
            { opacity: 1, duration: 0.35, ease: 'none' },
            index + 0.65
          );
      });

      timeline.duration(steps);
    }, track);
  };

  const teardown = () => {
    ctx?.revert();
    ctx = null;
    track.removeAttribute('data-pinned');
    // revert() restores the inline opacity GSAP set; the stacked fallback
    // has no opacity rule of its own, so clear it explicitly.
    panels.forEach((panel) => panel.style.removeProperty('opacity'));
  };

  // Re-evaluated on rotate/resize, so a window that becomes too short for a
  // full panel drops back to the stacked layout instead of clipping it.
  const mq = matchMedia(CAN_PIN);
  const sync = () => (mq.matches ? !ctx && build() : ctx && teardown());
  sync();
  mq.addEventListener('change', sync);
}
