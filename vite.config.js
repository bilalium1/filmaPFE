import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  base : './',
  server: {
    host: true,
    strictPort: true
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
      '@': '/src',  // مثال على إضافة alias
    },
  },
});

