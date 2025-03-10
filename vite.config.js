import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Spesifiser hvor byggede filer skal plasseres
    outDir: 'dist',
  },
  server: {
    host: '0.0.0.0', // Dette gjør at du kan få tilgang fra andre enheter på nettverket
    port: 3000, // Forsikre deg om at dette er riktig port
  },
})
