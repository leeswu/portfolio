import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({  optimizeDeps: {
    include: ['pixi.js'], // Ensure PixiJS is included in dependency optimization
  },
});
