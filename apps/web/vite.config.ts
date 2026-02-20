import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  worker: {
    format: 'es',
  },
  preview:{
    allowedHosts: ["hld.d3cod3r.online"]
  }
})
