import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // ⚠ important : le slash AVANT et APRÈS le nom du repo
  base: '/profile-banner-generator/',
  plugins: [react()],
})
