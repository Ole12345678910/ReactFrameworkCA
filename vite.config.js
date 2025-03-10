import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Specify the directory where the build files will be placed
    outDir: 'dist', // This makes sure the output files go into the 'dist' folder
  },
  server: {
    host: '0.0.0.0', // Allows access from any device on the network
    port: 3000, // Port number (make sure this is correct when running locally)
  },
})
