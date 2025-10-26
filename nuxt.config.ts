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
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '', 
        },
      },
    },
  },
})
