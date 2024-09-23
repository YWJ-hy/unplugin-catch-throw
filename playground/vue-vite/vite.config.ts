import { URL, fileURLToPath } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import inspect from 'vite-plugin-inspect'
import CatchThrow from 'unplugin-catch-throw/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    CatchThrow({ exclude: [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/, /\/catch\.ts$/] }),
    inspect(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
