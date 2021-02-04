import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const domain = 'http://localhost:3334/'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/server': {
        target: domain,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/server/, '')
      }
    },
    port: 3333
  }
})
