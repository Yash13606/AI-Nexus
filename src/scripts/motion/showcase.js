/** Sticky scroll showcase: copy pins, the visual swaps across capability steps.
 *
 *  IntersectionObserver rather than `animation-timeline: view()` deliberately —
 *  scroll-driven CSS is unsupported in Firefox, and this pattern needs the swap
 *  to work everywhere, not degrade to a single frozen panel. Also not Motion's
 *  useScroll: this is a discrete state change across 3-4 steps, not continuous
 *  interpolation, so a scroll-position value buys nothing a step index doesn't.
 *
 *  Every panel is in the HTML. With JS off they render stacked and readable. */
export function initShowcase(root = document) {
  for (const el of root.querySelectorAll('[data-showcase]')) {
    const steps = [...el.querySelectorAll('[data-step]')];
    if (steps.length < 2) return;
    el.setAttribute('data-showcase-ready', '');

    /* --step drives the pinned counter and rail; data-current marks the step
       itself. The pin alone was the whole feedback, and it is a number in a
       column a reader is not looking at — the step they ARE reading has to be
       the thing that changes. */
    const set = (i) => {
      el.style.setProperty('--step', String(i));
      steps.forEach((s, k) => s.toggleAttribute('data-current', k === i));
    };
    set(0);

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) set(steps.indexOf(e.target));
        }
      },
      { rootMargin: '-45% 0px -45% 0px' }
    );
    steps.forEach((s) => io.observe(s));
  }
}
