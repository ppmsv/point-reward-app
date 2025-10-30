// server/api/rewards.get.ts
import { defineEventHandler } from 'h3'
export default defineEventHandler(() => {
  return [
    { id: 1, name: 'Free Coffee', description: 'Free small coffee', points: 20, image: '/coffee.png', expiry: '2025-12-31', condition: '1 per user' },
    { id: 2, name: 'Discount Voucher', description: '10% off', points: 50, image: '/voucher.png', expiry: '2025-11-30', condition: 'Valid once' },
    { id: 3, name: 'Free Cake', description: 'One slice of cake', points: 60, image: '/cake.png', expiry: '2025-10-31', condition: 'Use within 7 days' }
  ]
})