import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Ensure the build output goes into the dist folder
  },
  base: '/', // This should be '/' for root deployment
})
