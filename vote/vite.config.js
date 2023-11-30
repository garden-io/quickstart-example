import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      '^/api': {
        target: 'http://api',
        changeOrigin: true,
        secure: false,
        logLevel: 'debug',
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            console.log('API proxy error', err)
          })
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            console.log(`Sending ${proxyReq.method} request to API`)
          })
          proxy.on('proxyRes', (proxyRes, _req, _res) => {
            console.log(`Received API response with status: ${proxyRes.statusCode}`)
          })
        }
      },
      '^/socket.io': {
        target: 'http://result',
        changeOrigin: true,
        secure: false,
        ws: true,
        logLevel: 'debug',
      }
    }
  }
})
