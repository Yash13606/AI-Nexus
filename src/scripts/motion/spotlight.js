/** Cursor spotlight on a grid of cards.
 *
 *  One listener on the container, not one per card: the pointer can only be
 *  over one card at a time, so N listeners would be N-1 idle closures. Writes
 *  --px/--py in percent on the card under the pointer and clears the last one.
 *
 *  Decoration in the §11 sense — every word of every card is legible at rest,
 *  with no pointer, no JS and no hover. Pointer-fine only, because a spotlight
 *  that follows a finger is a spotlight that sits under the finger. */
export function initSpotlight(root = document) {
  if (!matchMedia('(pointer: fine)').matches) return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  for (const grid of root.querySelectorAll('[data-spotlight]')) {
    let last = null;
    grid.addEventListener(
      'pointermove',
      (e) => {
        const card = e.target.closest('[data-spotlight] > *');
        if (card !== last) {
          if (last) last.style.removeProperty('--lit');
          if (card) card.style.setProperty('--lit', '1');
          last = card;
        }
        if (!card) return;
        const r = card.getBoundingClientRect();
        card.style.setProperty('--px', ((e.clientX - r.left) / r.width) * 100 + '%');
        card.style.setProperty('--py', ((e.clientY - r.top) / r.height) * 100 + '%');
      },
      { passive: true }
    );
    grid.addEventListener('pointerleave', () => {
      if (last) last.style.removeProperty('--lit');
      last = null;
    });
  }
}
