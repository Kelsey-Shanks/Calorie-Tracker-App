import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
    '/calories': {
      target: 'http://localhost:3000'
      }, 
    '/selections': {
      target: 'http://localhost:3000'
    },
    '/search_service': {
      target: 'http://localhost:3001'
    }, 
    '/user_profiles': {
      target: 'http://localhost:3002'
    },
    '/feedback_service': {
      target: 'http://localhost:3003'
    },
    '/badge_service_cal': {
      target: 'http://localhost:3004'
    },
    }
  }
})

