import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  optimizeDeps: {
    include: [
      '@radix-ui/react-tabs',
      // other dependencies...
    ]
  },
  plugins: [
    laravel({
      input: 'resources/js/app.tsx',
      refresh: true,
    }),
    react(),
    svgr(),
  ],
  resolve: {
    alias: {
      '@': '/resources/js',
    },
  },
});
