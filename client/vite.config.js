import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load environment variables
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react(), tailwindcss()],
    optimizeDeps: {
    include: [
      'react-markdown',
      'remark-gfm',
      'rehype-raw',
      'prism-react-renderer'
    ],
  },
    server: {
      proxy: {
        '/api': {
          target: env.VITE_API_BASE_URL,
          headers: {
            'accept': 'application/json',
            'content-type': 'application/json',
          },
          changeOrigin: true,
        }
      }
    }
  }
})
