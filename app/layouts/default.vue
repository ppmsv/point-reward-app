<template>
  <div class="layout">
    <slot /> 
  </div>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '~/stores/auth'
import { onMounted } from 'vue'     

const router = useRouter()
const route = useRoute()
const auth = useAuthStore()

onMounted(async () => {
  await auth.loadFromCookieOrStorage()

  
  if (route.path === '/login' && auth.authenticated) {
    router.push('/')
    return
  }

  
  if (!auth.authenticated && route.path !== '/login') {
    router.push('/login')
  }
})
</script>

<style scoped>
.layout {
  /* ลบ padding-bottom เดิมออกเพราะไม่มี nav ล่างแล้ว */
  padding-bottom: 0;
}
</style>
