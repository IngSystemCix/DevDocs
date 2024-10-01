// @ts-check
import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind({
      applyBaseStyles: true,
  }), react()],
  site: 'https://ingsystemcix.github.io',
  base: '/DevDocs/',
  build: {
    format: 'directory', // Usar directorios en lugar de archivos .html
  },
  output: 'server',
});