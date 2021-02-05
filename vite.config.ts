import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import path from 'path'

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
    host: 'localhost',
    port: 3333
  },
  // alias: {
  //   '$src': path.resolve(__dirname, './src')
  // }
})
