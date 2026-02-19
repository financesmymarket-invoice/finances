import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const repoName = 'finances';

export default defineConfig({
  base: `/${repoName}/`,
  plugins: [react()],
  server:{
    host: true,
    allowedHosts: [
      'noncontrolling-parsimoniously-andria.ngrok-free.dev'
    ]
  }
})
