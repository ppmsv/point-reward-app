// middleware/auth.global.ts
import { useAuthStore } from '~/stores/auth'

export default defineNuxtRouteMiddleware((to) => {
  if (process.client) {
    const auth = useAuthStore()
    if (!auth.authenticated && to.path !== '/login') {
      return navigateTo('/login')
    }
  }
})