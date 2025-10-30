import { defineStore } from 'pinia'
import { useCookie } from '#app'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null as string | null,
    username: '',
    points: 100,
    redeemedIds: [] as number[],
    authenticated: false,
  }),

  actions: {
    // Authenticate user (mock)
    async authenticateUser(user: { username: string; password: string }): Promise<boolean> {
      if (user.username === 'usertest' && user.password === 'passwordtest') {
        this.token = 'JWT_MOCK_TOKEN'
        this.username = user.username
        this.authenticated = true

        this.saveToCookie()

        if (process.client) {
          localStorage.setItem('authenticated', 'true')
        }

        return true
      }
      return false
    },

    // Logout user
    logout() {
      this.token = null
      this.username = ''
      this.authenticated = false
      this.points = 100
      this.redeemedIds = []

      this.saveToCookie()

      if (process.client) {
        localStorage.removeItem('points')
        localStorage.removeItem('redeemedIds')
        localStorage.removeItem('authenticated')
      }
    },

    // Load state from cookie
    loadFromCookie() {
      const cookie = document.cookie.split('; ').find(row => row.startsWith('auth='))
      if (cookie) {
        try {
          const data = JSON.parse(cookie.split('=')[1])
          this.$patch(data)
          if (this.token) this.authenticated = true
        } catch (e) {
          console.error('Invalid auth cookie')
        }
      }
    },

    // Load state from cookie or localStorage
    async loadFromCookieOrStorage() {
      if (process.client) {
        const pointsLS = localStorage.getItem('points')
        const redeemedLS = localStorage.getItem('redeemedIds')
        const tokenCookie = useCookie('token').value
        const usernameCookie = useCookie('username').value
        const authenticatedLS = localStorage.getItem('authenticated')

        if (pointsLS) this.points = Number(pointsLS)

        if (redeemedLS) {
          try {
            const parsed = JSON.parse(redeemedLS)
            this.redeemedIds = Array.isArray(parsed) ? parsed : []
          } catch {
            this.redeemedIds = []
          }
        } else {
          this.redeemedIds = []
        }

        if (tokenCookie) this.token = tokenCookie
        if (usernameCookie) this.username = usernameCookie

        this.authenticated = !!tokenCookie || authenticatedLS === 'true'
      }
    },

    // Save state to cookie and localStorage
    saveToCookie() {
      useCookie('points', { path: '/' }).value = String(this.points)
      useCookie('redeemedIds', { path: '/' }).value = JSON.stringify(this.redeemedIds)
      useCookie('username', { path: '/' }).value = this.username
      useCookie('token', { path: '/' }).value = this.token

      if (process.client) {
        localStorage.setItem('points', String(this.points))
        localStorage.setItem('redeemedIds', JSON.stringify(this.redeemedIds))
      }
    },

    // Redeem a reward
    redeemReward(id: number, cost: number): boolean {
      if (this.points < cost || this.redeemedIds.includes(id)) return false

      this.points -= cost
      this.redeemedIds.push(id)
      this.saveToCookie()
      return true
    },

    // Check if reward already redeemed
    hasRedeemed(id: number): boolean {
      return this.redeemedIds.includes(id)
    },
  },
})
