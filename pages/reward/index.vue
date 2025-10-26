<template>
  <div class="reward-page">

    <!-- Back Button -->
    <button @click="router.push('/')" class="back-btn">
      ← Back to Home
    </button>

    <h2>All Rewards</h2>

    <!-- Reward List -->
    <div v-if="isReady" class="reward-list">
      <div
        v-for="item in rewards"
        :key="item.id"
        class="reward-item"
        @click="goToReward(item)"
      >
        <img :src="item.image" alt="" />
        <h4>{{ item.name }}</h4>
        <p>{{ item.points }} Points</p>
        <p>Expires: {{ item.expiry }}</p>
      </div>
    </div>

    <!-- Loading -->
    <div v-else class="loading">
      Loading rewards...
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '~/stores/auth'

const auth = useAuthStore()
const router = useRouter()
const rewards = ref<any[]>([])
const isReady = ref(false)

const goToReward = (item: { id: number }) => {
  router.push(`/reward/${item.id}`)
}

const fetchRewards = async () => {
  try {
    const res = await fetch('/api/rewards')
    rewards.value = await res.json()
  } catch (err) {
    console.error(err)
    rewards.value = [
      { id: 1, name: 'Free Coffee', points: 20, image: '/coffee.png', expiry: '2025-12-31' },
      { id: 2, name: 'Discount Voucher', points: 50, image: '/voucher.png', expiry: '2025-12-31' },
      { id: 3, name: 'Free Cake', points: 30, image: '/cake.png', expiry: '2025-12-31' },
      { id: 4, name: 'Gift Card', points: 100, image: '/giftcard.png', expiry: '2025-12-31' }
    ]
  } finally {
    isReady.value = true
  }
}

onMounted(async () => {
  await auth.loadFromCookieOrStorage()
  await fetchRewards()
})
</script>

<style scoped lang="scss">
.reward-page {
  padding: 16px;
  min-height: 100vh;
  background: linear-gradient(180deg, #fff5ee, #fdf0e5);
  font-family: 'Poppins', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;

  /* Back Button */
  .back-btn {
    align-self: flex-start;
    margin-bottom: 16px;
    padding: 0.5rem 1rem;
    background-color: #f6c23e;
    color: #000;
    border: none;
    border-radius: 9999px;
    font-weight: 600;
    cursor: pointer;
    box-shadow: 0 3px 6px rgba(0,0,0,0.2);
    transition: all 0.2s;

    &:hover {
      background-color: #f4b619;
      transform: scale(1.05);
    }
  }

  h2 {
    font-size: 2rem;
    color: #d97706;
    margin-bottom: 20px;
    text-align: center;
  }

  /* Reward List */
  .reward-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 16px;
    width: 100%;
    max-width: 1200px;

    .reward-item {
      background: rgba(255, 255, 255, 0.85);
      backdrop-filter: blur(10px);
      border-radius: 1.5rem;
      padding: 12px;
      text-align: center;
      cursor: pointer;
      transition: transform 0.25s, box-shadow 0.25s;
      box-shadow: 0 5px 15px rgba(0,0,0,0.1);

      &:hover {
        transform: translateY(-5px) scale(1.02);
        box-shadow: 0 10px 25px rgba(0,0,0,0.15);
      }

      img {
        width: 120px;
        height: 120px;
        object-fit: cover;
        border-radius: 1rem;
        margin-bottom: 8px;
      }

      h4 {
        margin: 4px 0;
        color: #b45309;
        font-weight: 600;
      }

      p {
        margin: 2px 0;
        color: #555;
        font-size: 0.875rem;
      }
    }
  }

  .loading {
    margin-top: 50px;
    color: #777;
    font-size: 1rem;
  }
}

/* Responsive */
@media (max-width: 640px) {
  .reward-page {
    padding: 12px;

    .reward-list {
      gap: 12px;
    }
  }
}
</style>
