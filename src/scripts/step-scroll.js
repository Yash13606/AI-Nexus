/** Scroll as a third driver for a tablist — the deployment steps.
 *
 *  The widget is pinned for the length of a track that is N screens tall, and
 *  the scroll position through that track picks the step. Click and the arrow
 *  keys still work: this calls the same `select` the tablist already exposes,
 *  so there is one selection model with three inputs rather than two widgets.
 *
 *  NOT scroll-scrubbed animation — the step is a discrete index, and crossing a
 *  boundary swaps content. §16.3's rule is that anything which swaps content
 *  uses a real listener rather than `animation-timeline`, which is unsupported
 *  in Firefox and would strand a reader on step one.
 *
 *  Bails to the plain tablist under reduced motion, on a narrow screen, or in a
 *  window too short to hold the block — in each case the markup is untouched
 *  and the tabs behave exactly as they did before this module existed.
 *
 *  rAF-batched: the scroll handler only ever schedules a frame, so the read of
 *  getBoundingClientRect happens once per frame at most.
 */
const CAN_SCROLL = '(min-width: 900px) and (min-height: 640px) and (max-height: 1600px)';

export function initStepScroll(track, api) {
  if (!track || !api || api.count < 2) return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const mq = matchMedia(CAN_SCROLL);
  let frame = 0;
  let current = -1;
  let armed = false;

  const update = () => {
    frame = 0;
    const box = track.getBoundingClientRect();
    /* The distance the track can travel while its sticky child is pinned. On a
       track shorter than the viewport this is <= 0 and there is nothing to
       map, so leave the selection alone rather than snapping it to 0. */
    const travel = box.height - innerHeight;
    if (travel <= 0) return;
    const progress = Math.min(1, Math.max(0, -box.top / travel));

    /* Continuous, every frame: the rail's fill is scrubbed by this rather than
       jumping at each boundary. Without it the only feedback is the step swap,
       and between swaps a reader scrolls into nothing happening — which is
       what "it isn't smooth" actually means most of the time. */
    track.style.setProperty('--hiw-progress', progress.toFixed(4));

    const step = Math.min(api.count - 1, Math.floor(progress * api.count));
    if (step === current) return;
    current = step;
    api.select(step);
  };

  const onScroll = () => {
    if (!frame) frame = requestAnimationFrame(update);
  };

  const arm = () => {
    if (armed) return;
    armed = true;
    track.setAttribute('data-step-scroll', '');
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onScroll);
    update();
  };

  const disarm = () => {
    if (!armed) return;
    armed = false;
    track.removeAttribute('data-step-scroll');
    track.style.removeProperty('--hiw-progress');
    removeEventListener('scroll', onScroll);
    removeEventListener('resize', onScroll);
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
    current = -1;
    /* Back to the plain tablist, showing the first step — which is what it
       shows on load, so a reader who resizes does not land on step 3 with no
       way to tell why. */
    api.select(0);
  };

  const sync = () => (mq.matches ? arm() : disarm());
  sync();
  mq.addEventListener('change', sync);
}
