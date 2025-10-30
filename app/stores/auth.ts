import { defineStore } from 'pinia'

// ตัวแปรเช็ค client side
const isClient = typeof window !== 'undefined'

// TypeScript ไม่รู้จัก useCookie เราจะ declare ให้ TS รู้
declare function useCookie(name: string, options?: { path?: string }): { value: string | null }

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null as string | null,
    username: '',
    points: 100,
    redeemedIds: [] as number[],
    authenticated: false,
  }),

  actions: {
     async authenticateUser(user: { username: string; password: string }): Promise<boolean> {
      if (user.username === 'usertest' && user.password === 'passwordtest') {
        this.token = 'JWT_MOCK_TOKEN'
        this.username = user.username
        this.authenticated = true

        this.saveToCookie()

        if (isClient) {
          localStorage.setItem('authenticated', 'true')
        }

        return true
      }
      return false
    },
 
    logout() {
      this.token = null
      this.username = ''
      this.authenticated = false
      this.points = 100
      this.redeemedIds = []

      this.saveToCookie()

      if (isClient) {
        localStorage.removeItem('points')
        localStorage.removeItem('redeemedIds')
        localStorage.removeItem('authenticated')
      }
    },
 
    loadFromCookie() {
      const cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith('auth='))
        ?.split('=')[1]

      if (cookieValue) {
        try {
          const data = JSON.parse(cookieValue)
          this.$patch(data)
          if (this.token) this.authenticated = true
        } catch {
          console.error('Invalid auth cookie')
        }
      }
    },
 
    async loadFromCookieOrStorage() {
      if (isClient) {
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
 
    saveToCookie() {
      useCookie('points', { path: '/' }).value = String(this.points)
      useCookie('redeemedIds', { path: '/' }).value = JSON.stringify(this.redeemedIds)
      useCookie('username', { path: '/' }).value = this.username
      useCookie('token', { path: '/' }).value = this.token

      if (isClient) {
        localStorage.setItem('points', String(this.points))
        localStorage.setItem('redeemedIds', JSON.stringify(this.redeemedIds))
      }
    },
 
    redeemReward(id: number, cost: number): boolean {
      if (this.points < cost || this.redeemedIds.includes(id)) return false

      this.points -= cost
      this.redeemedIds.push(id)
      this.saveToCookie()
      return true
    },

     hasRedeemed(id: number): boolean {
      return this.redeemedIds.includes(id)
    },
  },
})
