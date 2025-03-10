import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Output directory for build files
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
  base: '/', // Ensure this is set to '/' for root deployment
})
