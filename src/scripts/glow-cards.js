/** Mouse-following glow for cards marked [data-glow-card]. Purely decorative
 *  hover chrome — --x/--y default to center in CSS, so a card this never
 *  runs on (JS off, touch) just renders flat, nothing is hidden either way. */
export function initGlowCards(root = document) {
  const cards = root.querySelectorAll('[data-glow-card]');
  cards.forEach((card) => {
    card.addEventListener('pointermove', (e) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--x', `${e.clientX - rect.left}px`);
      card.style.setProperty('--y', `${e.clientY - rect.top}px`);
    });
  });
}
