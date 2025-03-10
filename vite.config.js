import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // This is the output folder where the built files will go
  },
  base: '/', // This is important for deployment on Netlify
})
