import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
   server: {
    proxy: {
      // Redirigir cualquier solicitud a /api al backend en Vercel
      '/api': 'https://app-misiones-espaciales.vercel.app',
    },
  },
})