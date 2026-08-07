/** Authored SVG icon set. One stroke weight (1.5), one grid (16), shared
 *  between Icon.astro (the site's Astro pages) and any plain-React island
 *  that needs the same glyphs — one source, so the two can't drift apart. */
export const iconPaths = {
  check: '<path d="M3 8.5 6.2 12 13 4.5"/>',
  'arrow-right': '<path d="M3 8h10"/><path d="M9 4l4 4-4 4"/>',
  'arrow-up-right': '<path d="M5 11 11 5"/><path d="M5.6 5H11v5.4"/>',
  'chevron-down': '<path d="m4 6.5 4 4 4-4"/>',
  menu: '<path d="M2.5 5h11"/><path d="M2.5 11h11"/>',
  close: '<path d="M4 4l8 8"/><path d="M12 4l-8 8"/>',
  rule: '<path d="M2 8h12"/>',
  cross: '<path d="M8 3v10"/><path d="M3 8h10"/>',
  book: '<path d="M2 3.5c1.8-.7 3.4-.7 6 .5v9c-2.6-1.2-4.2-1.2-6-.5z"/><path d="M14 3.5c-1.8-.7-3.4-.7-6 .5v9c2.6-1.2 4.2-1.2 6-.5z"/>',
  scale: '<path d="M8 2v11"/><path d="M3 4h10"/><path d="M3 4 1.5 8a1.8 1.8 0 0 0 3.4 0z"/><path d="M13 4l-1.5 4a1.8 1.8 0 0 0 3.4 0z"/><path d="M5.5 14h5"/>',
  home: '<path d="M2.5 8 8 3l5.5 5"/><path d="M4 6.5V13h8V6.5"/>',
  stack: '<path d="M8 2 2 5.5 8 9l6-3.5z"/><path d="M2 8.5 8 12l6-3.5"/><path d="M2 11.5 8 15l6-3.5"/>',
  globe: '<circle cx="8" cy="8" r="5.5"/><ellipse cx="8" cy="8" rx="2.4" ry="5.5"/><path d="M2.5 8h11"/>',
  shield: '<path d="M8 2 3 4v4.2c0 3.2 2.1 5.6 5 6.8 2.9-1.2 5-3.6 5-6.8V4z"/><path d="M5.7 8 7.3 9.6 10.5 6.4"/>',
  plus: '<path d="M8 3v10"/><path d="M3 8h10"/>',
  mail: '<path d="M2.5 4h11v8h-11z"/><path d="m2.5 4.5 5.5 4 5.5-4"/>',
  phone: '<path d="M4 2.5h2.2l1 2.6-1.4 1a7.5 7.5 0 0 0 3.1 3.1l1-1.4 2.6 1V12a1.4 1.4 0 0 1-1.5 1.4A10.5 10.5 0 0 1 2.6 4 1.4 1.4 0 0 1 4 2.5"/>',
  'map-pin': '<path d="M8 14s5-4 5-8A5 5 0 0 0 3 6c0 4 5 8 5 8"/><circle cx="8" cy="6" r="1.8"/>',
  clock: '<circle cx="8" cy="8" r="5.5"/><path d="M8 5v3.2l2.2 1.3"/>',
  grid: '<rect x="2.5" y="2.5" width="4.5" height="4.5" rx="1"/><rect x="9" y="2.5" width="4.5" height="4.5" rx="1"/><rect x="2.5" y="9" width="4.5" height="4.5" rx="1"/><rect x="9" y="9" width="4.5" height="4.5" rx="1"/>',
  'doc-check': '<path d="M4.5 2.5h4.2L11.5 5.5V13.5h-7z"/><path d="M6.1 8.6l1.3 1.3L10 7"/>',
  'user-check': '<circle cx="6.5" cy="5.3" r="2.3"/><path d="M2.5 13.3c0-2.5 1.8-4 4-4"/><path d="M9.3 10.3l1.3 1.3L13.5 8.7"/>',
  toggle: '<rect x="2.5" y="6" width="11" height="4" rx="2"/><circle cx="10.5" cy="8" r="1.6"/>',
} as const;

export type IconName = keyof typeof iconPaths;
