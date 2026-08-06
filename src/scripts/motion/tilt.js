/** 3D pointer tilt + a glow that tracks the cursor, for card grids.
 *
 *  One listener per GRID, not per card. The pointer can only be over one card
 *  at a time, so N listeners would be N-1 idle closures — and on the agent
 *  roster N is twenty.
 *
 *  Writes five custom properties on the hovered card and clears the last one:
 *    --rx / --ry   rotation in degrees, capped
 *    --px / --py   pointer position in percent, for the glow and the shine
 *    --lit         0 or 1, so CSS can fade the glow rather than snap it
 *
 *  All of it is decoration. Every card is fully legible at rest with no
 *  pointer, no JavaScript and no hover — the tilt moves the card, it never
 *  reveals anything that was not already there.
 *
 *  Reads are batched into a rAF so a pointermove storm cannot cause layout
 *  thrash: getBoundingClientRect is called once per frame at most, not once
 *  per event. */
const MAX = 6; // degrees. Past ~8 a card reads as a toy rather than a surface.

export function initTilt(root = document) {
  if (!matchMedia('(pointer: fine)').matches) return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  for (const grid of root.querySelectorAll('[data-tilt]')) {
    let card = null;
    let last = null;
    let cx = 0;
    let cy = 0;
    let frame = 0;

    const paint = () => {
      frame = 0;
      if (!card) return;
      const r = card.getBoundingClientRect();
      const x = (cx - r.left) / r.width;
      const y = (cy - r.top) / r.height;
      card.style.setProperty('--px', (x * 100).toFixed(2) + '%');
      card.style.setProperty('--py', (y * 100).toFixed(2) + '%');
      card.style.setProperty('--ry', ((x - 0.5) * 2 * MAX).toFixed(2) + 'deg');
      card.style.setProperty('--rx', ((0.5 - y) * 2 * MAX).toFixed(2) + 'deg');
    };

    grid.addEventListener(
      'pointermove',
      (e) => {
        const hit = e.target.closest('[data-tilt] > *');
        if (hit !== last) {
          if (last) {
            last.style.removeProperty('--lit');
            last.style.removeProperty('--rx');
            last.style.removeProperty('--ry');
          }
          if (hit) hit.style.setProperty('--lit', '1');
          last = hit;
        }
        card = hit;
        cx = e.clientX;
        cy = e.clientY;
        if (hit && !frame) frame = requestAnimationFrame(paint);
      },
      { passive: true }
    );

    grid.addEventListener('pointerleave', () => {
      if (last) {
        last.style.removeProperty('--lit');
        last.style.removeProperty('--rx');
        last.style.removeProperty('--ry');
      }
      last = null;
      card = null;
    });
  }
}
