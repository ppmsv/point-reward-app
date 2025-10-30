<template>
  <div class="reward-detail-page min-h-screen bg-gradient-to-b from-[#fff9f5] to-[#fdf6f2] flex justify-center items-center font-poppins relative">

    <!-- Back Button -->
    <button
      @click="goBack"
      class="absolute top-6 left-6 bg-yellow-500 text-black font-semibold px-4 py-2 rounded-full shadow-md hover:bg-yellow-400 hover:scale-105 transition-all z-20"
    >
      ← Back to
    </button>

    <!-- Reward Container -->
    <div
      v-if="selectedReward"
      class="reward-container relative w-[90%] max-w-md bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 text-center border border-white/40"
    >
      <img
        :src="selectedReward.image"
        alt="Reward Image"
        class="w-60 h-60 mx-auto rounded-2xl object-cover shadow-lg mb-5"
      />
      <h2 class="text-3xl font-bold text-yellow-700 mb-2">{{ selectedReward.name }}</h2>
      <p class="text-gray-700 font-medium mb-1">⭐ {{ selectedReward.points }} Points</p>
      <p class="text-gray-500 text-sm mb-3">Expires: {{ selectedReward.expiry }}</p>
      <p class="text-gray-600 text-base mb-6">{{ selectedReward.description || 'No description' }}</p>

      <button
        :disabled="auth.hasRedeemed(selectedReward.id) || auth.points < selectedReward.points"
        @click="confirmRedeem"
        class="w-full py-3 rounded-full font-semibold text-lg shadow-md transition-all duration-200"
        :class="{
          'bg-yellow-500 hover:bg-yellow-400 text-black hover:scale-105':
            !auth.hasRedeemed(selectedReward.id) && auth.points >= selectedReward.points,
          'bg-gray-300 text-gray-500 cursor-not-allowed':
            auth.hasRedeemed(selectedReward.id) || auth.points < selectedReward.points
        }"
      >
        {{ auth.hasRedeemed(selectedReward.id) ? 'Already Redeemed' : 'แลกรับสิทธิ์' }}
      </button>

      <p class="mt-6 text-sm font-semibold text-gray-700">
        คะแนนคงเหลือ: <span class="text-yellow-600">{{ auth.points }}</span>
      </p>
    </div>

    <!-- Reward Not Found -->
    <div v-else class="text-gray-600 text-center">
      Reward not found
    </div>

    <!-- Confirmation Dialog -->
    <div v-if="showDialog" class="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div class="bg-white p-8 rounded-2xl shadow-2xl text-center w-80 animate-fadeIn">
        <p class="mb-5 text-lg font-medium text-gray-800">ยืนยันการแลกรับสิทธิ์นี้หรือไม่?</p>
        <div class="flex justify-center gap-4">
          <button
            class="px-5 py-2 bg-yellow-500 text-black rounded-full font-semibold hover:bg-yellow-400 hover:scale-105 transition-all"
            @click="redeemReward"
          >
            ยืนยัน
          </button>
          <button
            class="px-5 py-2 bg-gray-300 text-gray-800 rounded-full font-semibold hover:bg-gray-400 transition-all"
            @click="showDialog = false"
          >
            ยกเลิก
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '~/stores/auth'

const auth = useAuthStore()
const router = useRouter()
const route = useRoute()
const selectedReward = ref<any>(null)
const showDialog = ref(false)

const rewards = [
  { id: 1, name: 'Free Coffee', points: 20, description: 'Small coffee', image: '/coffee.png', expiry: '2025-12-31' },
  { id: 2, name: 'Discount Voucher', points: 50, description: '10% off', image: '/voucher.png', expiry: '2025-12-31' },
  { id: 3, name: 'Free Cake', points: 60, description: 'One slice', image: '/cake.png', expiry: '2025-12-31' }
]

onMounted(async () => {
  await auth.loadFromCookieOrStorage()
  selectedReward.value = rewards.find(r => r.id === Number(route.params.id)) || null
})

const confirmRedeem = () => {
  if (!auth.authenticated) return alert('กรุณาเข้าสู่ระบบก่อน')
  if (auth.hasRedeemed(selectedReward.value.id)) return alert('คุณแลกรางวัลนี้ไปแล้ว')
  if (auth.points < selectedReward.value.points) return alert('คะแนนไม่เพียงพอ')
  showDialog.value = true
}

const redeemReward = async () => {
  const success = auth.redeemReward(selectedReward.value.id, selectedReward.value.points)
  if (success) {
    await auth.loadFromCookieOrStorage()
    alert('แลกรับสิทธิ์สำเร็จ! 🎉')
  } else {
    alert('ไม่สามารถแลกรับสิทธิ์ได้')
  }
  showDialog.value = false
}

const goBack = () => router.back()
</script>

<style scoped>
.reward-container {
  position: relative;
  z-index: 10;
  backdrop-filter: blur(14px);
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 2rem;
  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.12);
  background: rgba(255, 255, 255, 0.85);
  padding: 2rem;
  max-width: 400px;
  width: 90%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.reward-container:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 45px rgba(0, 0, 0, 0.15);
}

.reward-container img {
  border-radius: 1.5rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.25rem;
  width: 100%;
  max-width: 240px;
  height: auto;
  object-fit: cover;
}

button {
  border-radius: 9999px;
  padding: 0.75rem 1rem;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.25s ease;
}

/* Back button */
.back-btn {
  position: absolute;
  top: 1.5rem;
  left: 1.5rem;
  background-color: #f6c23e;
  color: #000;
  font-weight: 600;
  padding: 0.6rem 1.2rem;
  border-radius: 9999px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.2);
  border: none;
  cursor: pointer;
  z-index: 20;
  transition: all 0.25s;
}

.back-btn:hover {
  background-color: #f4b619;
  transform: scale(1.05);
}

/* Disabled button */
button:disabled {
  background: #ccc;
  color: #888;
  cursor: not-allowed;
}

/* Dialog animation */
.animate-fadeIn {
  animation: fadeIn 0.3s ease-out;
}

.reward-detail-page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(180deg, #fff9f5 0%, #fdf4ef 100%);
  position: relative;
  padding: 2rem;
  font-family: 'Poppins', sans-serif;
}

h2 {
  font-size: 2rem;
  font-weight: 700;
  color: #d97706;
  margin-bottom: 0.5rem;
}

p {
  margin: 0.25rem 0;
  font-size: 1rem;
  color: #555;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .reward-container {
    padding: 1.5rem;
    max-width: 95%;
  }
  .reward-container h2 {
    font-size: 1.75rem;
  }
  .reward-container p {
    font-size: 0.9rem;
  }
  .reward-container img {
    max-width: 180px;
  }
  .reward-container button {
    font-size: 0.95rem;
    padding: 0.65rem 0.9rem;
  }
  .back-btn {
    padding: 0.5rem 1rem;
    top: 1rem;
    left: 1rem;
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .reward-container {
    padding: 1rem;
    max-width: 90%;
  }
  .reward-container h2 {
    font-size: 1.5rem;
  }
  .reward-container p {
    font-size: 0.85rem;
  }
  .reward-container img {
    max-width: 150px;
  }
  .reward-container button {
    font-size: 0.9rem;
    padding: 0.6rem 0.8rem;
  }
  .back-btn {
    padding: 0.45rem 0.8rem;
    font-size: 0.85rem;
  }
}
</style>
