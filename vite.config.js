import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  base : '/',
  server: {
    host: 'localhost',
    port: 5173,
    proxy:{
      "/api" : "http://localhost:5000"
    }
  },

  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
    ]
  },

  build : {
    outDir: 'public/dist',
    emptyOutDir: true,
    minify: 'terser',
    sourcemap: false,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            return 'vendor'
          }
        }
      }
    }
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
