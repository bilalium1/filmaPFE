import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  base : '/',
  server: {
    host: true,
  },

  build : {
    outDir: 'public/dist',
    emptyOutDir: true
  },
  publicDir: './public/static',
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
