import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'



// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        // strip the /api prefix before forwarding so backend routes like /applicants match
        rewrite: (path) => path.replace(/^\/api/, ''),
        // changeOrigin: true
      },
      "/rpc": {
        target: "http://localhost:3000",
        // proxy RPC calls to the API server
        // changeOrigin: true
      }
    }
  },
  resolve: {
    alias: [
      { find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
      { find: '#src', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
    ],
  },
})
