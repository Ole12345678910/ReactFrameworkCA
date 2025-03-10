import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // The output folder where your build files will be placed
  },
  base: '/', // This is super important for deployment on Netlify
})
