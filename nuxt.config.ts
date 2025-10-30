import { defineNuxtConfig } from 'nuxt/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt'],

  css: [
    '~/assets/scss/_reboot.scss',
    '~/assets/scss/_login_grid.scss',
    '~/assets/scss/pages/_login.scss'
  ],

  vite: {
    plugins: [tsconfigPaths()],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "~/assets/scss/_variables.scss";'
        }
      }
    }
  }
 })