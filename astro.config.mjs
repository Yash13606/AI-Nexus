import { defineConfig } from 'astro/config';
import tailwind from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://www.ainexushub.ai',
  trailingSlash: 'always',
  build: { format: 'directory' },
  vite: { plugins: [tailwind()] },
});
