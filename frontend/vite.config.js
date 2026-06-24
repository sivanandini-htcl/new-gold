import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Vendor chunks - split large vendor libraries
          if (id.includes('node_modules')) {
            if (id.includes('firebase')) {
              return 'vendor-firebase';
            }
            if (id.includes('recharts') || id.includes('chart')) {
              return 'vendor-charts';
            }
            if (id.includes('swiper')) {
              return 'vendor-swiper';
            }
            if (id.includes('react-dom') || id.includes('@emotion')) {
              return 'vendor-react-dom';
            }
          }

          // Page chunks - group related pages
          if (id.includes('Authentication')) {
            return 'pages-auth';
          }
          if (id.includes('ProfileComponents')) {
            return 'pages-profile';
          }
          if (
            id.includes('/pages/Gold') ||
            id.includes('/pages/Silver') ||
            id.includes('/pages/Metals')
          ) {
            return 'pages-products';
          }
        },
      },
    },
    chunkSizeWarningLimit: 700,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
  },
});
