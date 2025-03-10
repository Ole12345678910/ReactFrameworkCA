import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Build output directory
  },
  base: '/', // Ensures the assets are referenced correctly when deployed
})
