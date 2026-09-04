import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  base: '/KingPandaDefense/',
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    }
  },

  server: {
    port: 3000,
    open: true,
  },
})