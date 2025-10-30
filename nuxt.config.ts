import { defineNuxtConfig } from 'nuxt/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineNuxtConfig({
  modules: [
    '@pinia/nuxt',
  ],
  css: [
    '@/assets/scss/_reboot.scss',
    '@/assets/scss/_login_grid.scss',
    '@/assets/scss/pages/_login.scss'
  ],
   vite: {
    plugins: [tsconfigPaths()],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/scss/_variables.scss";'
        }
      }
    }
  },
  alias: {
    '@': '/Users/ACER/Documents/point-reward-app/app',
    '~': '/Users/ACER/Documents/point-reward-app/app'
  }
})