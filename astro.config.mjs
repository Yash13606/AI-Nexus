import { defineConfig } from 'astro/config';
import tailwind from '@tailwindcss/vite';
import react from '@astrojs/react';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  site: 'https://www.ainexushub.ai',
  trailingSlash: 'always',
  build: { format: 'directory' },
  /* React is loaded for ONE island — the platform card stack. Every other
     route ships zero framework JS, and that is measured per route rather than
     assumed; see DESIGN.md §15. */
  integrations: [react()],
  vite: {
    plugins: [tailwind()],
    resolve: {
      alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
    },
  },
});
