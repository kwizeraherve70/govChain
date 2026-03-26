import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: path.resolve(__dirname, 'src/frontend/postcss.config.js'),  // Point to the new PostCSS config path
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/frontend/src'),  // Alias for your main code
    },
  },
  build: {
    outDir: path.resolve(__dirname, 'dist'),  // Output to dist folder in root
  },
  server: {
    open: true,  // Ensure it opens with the root index.html
  },
});