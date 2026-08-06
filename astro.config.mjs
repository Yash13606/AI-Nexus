import { defineConfig } from 'astro/config';
import tailwind from '@tailwindcss/vite';

import react from '@astrojs/react';

export default defineConfig({
  site: 'https://www.ainexushub.ai',
  trailingSlash: 'always',
  build: { format: 'directory' },
  vite: { plugins: [tailwind()] },
  integrations: [react()],
  devToolbar: { enabled: false },
});