import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  optimizeDeps: {
      include: ['pixi.js'], // Ensure PixiJS is included in dependency optimization
    },

  integrations: [react()],
});