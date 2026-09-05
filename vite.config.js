import { defineConfig } from 'vite'
import path from 'path'

const abstracts = path.resolve(import.meta.dirname, 'src/scss/abstracts').replace(/\\/g, '/')
export default defineConfig({
  base: '/KingPandaDefense/',

  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    }
  },

  css: {
    preprocessorOptions: {
      scss: {
        silenceDeprecations: ['legacy-js-api', 'import', 'color-functions', 'global-builtin'],
        additionalData: `@use "${abstracts}" as *;`
      }
    }
  },

  server: {
    port: 3000,
    open: true,
  },

  build: {
  assetsInlineLimit: 0,
  rollupOptions: {
    output: {
      assetFileNames: 'assets/[name]-[hash][extname]'
    }
  }
}
})