import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    modules: {
      generateScopedName: '[name]__[local]__[hash:5]',
    },
  },
  resolve: {
    alias: {
      components: '/src/components',
      pages: '/src/pages',
      styles: '/src/assets/styles',
      img: '/src/assets/img',
      api: '/src/api',
    },
  },
  server: {
    port: 3001,
    host: true, // Allows external access
  },
});
