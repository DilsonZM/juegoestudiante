import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ¡cambia NOMBRE_REPO por el nombre exacto del repo!
export default defineConfig({
  plugins: [react()],
  base: '/NOMBRE_REPO/',   // <— importante para rutas y assets en GH Pages
})
