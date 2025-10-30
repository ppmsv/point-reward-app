// middleware/auth.global.ts
import { useAuthStore } from '../stores/auth'

declare function defineNuxtRouteMiddleware(fn: (to: any) => any): any
declare function navigateTo(path: string): any

export default defineNuxtRouteMiddleware((to) => {
  if (process.client) {
    const auth = useAuthStore()
    if (!auth.authenticated && to.path !== '/login') {
      return navigateTo('/login')
    }
  }
})
