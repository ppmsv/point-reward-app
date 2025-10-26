<template>
  <!-- Navbar -->
  <nav class="navbar">
    <div class="navbar-left">
      <span class="font-semibold text-gray-800">{{ auth.username }}</span>

      <!-- Hamburger button  -->
      <button class="hamburger" @click="toggleMenu">
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div :class="['nav-menu', { 'open': menuOpen }]">
        <NuxtLink to="/" class="nav-link" :class="{ active: $route.path === '/' }">Home</NuxtLink>
        <NuxtLink to="/reward" class="nav-link" :class="{ active: $route.path.startsWith('/reward') }">Reward</NuxtLink>
        <NuxtLink to="/profile" class="nav-link" :class="{ active: $route.path === '/profile' }">Profile</NuxtLink>
      </div>
    </div>

    <div class="navbar-right">
      {{ auth.points }} pts
    </div>
  </nav>

  <!-- Hero Section -->
  <section
    class="hero-section min-h-[700px] sm:min-h-[800px] flex flex-col justify-center items-center bg-gradient-to-br from-[#6B4226] to-[#221210] px-6 sm:px-12 mt-[60px] rounded-3xl text-center"
  >
    <!-- Text -->
    <div class="max-w-lg">
      <h1 class="text-4xl sm:text-6xl md:text-7xl font-bold text-white mb-2">Wake Up</h1>
      <h1 class="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-4">With Coffee</h1>
      <p class="text-white/80 text-lg sm:text-xl mb-4">Experience the aroma, taste the passion!</p>
      <h1 class="text-6xl sm:text-[80px] md:text-[100px] xl:text-[120px] uppercase text-white/50 font-bold mb-6">☕</h1>
      <button class="redeem-btn" @click="handleRedeem">Redeem Now</button>
    </div>

    <!-- Image -->
    <div class="mt-8 flex justify-center">
      <img
        src="/hero-2.png"
        alt="Coffee Hero"
        class="w-[180px] sm:w-[280px] md:w-[320px] lg:w-[350px] h-auto object-contain drop-shadow-2xl"
      />
    </div>
  </section>

  <!-- Rewards Section -->
  <section class="rewards-section py-12 bg-gray-50">
    <div class="container-xl px-4 sm:px-6 lg:px-8">
      <h2 class="text-3xl font-bold text-gray-800 mb-6 text-center sm:text-left">Available Rewards</h2>

      <div class="flex overflow-x-auto gap-4 sm:gap-6 pb-4">
        <div
          v-for="item in rewards"
          :key="item.id"
          class="card reward-item bg-white flex-shrink-0 border-0 shadow-md rounded-xl cursor-pointer min-w-[180px] hover:translate-y-[-4px] hover:shadow-lg transition-transform"
          @click="goToReward(item)"
        >
          <img :src="item.image" class="w-full h-32 sm:h-36 rounded-t-xl object-cover" />
          <div class="p-3 text-center">
            <h5 class="text-yellow-500 font-semibold mb-1">{{ item.name }}</h5>
            <p class="text-gray-700 mb-1">{{ item.points }} Points</p>
            <p class="text-gray-500 text-sm mb-1">Expires: {{ item.expiry }}</p>
            <p v-if="auth.hasRedeemed(item.id)" class="text-red-500 text-sm font-bold">Already Redeemed</p>
            <p v-else-if="auth.points < item.points" class="text-gray-400 text-sm">Not enough points</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="bg-[#221210] text-white py-10 mt-12 font-poppins relative overflow-hidden">
    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-[3px] bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full"></div>

    <div class="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
      <div class="text-center md:text-left space-y-1">
        <h3 class="text-2xl font-bold text-yellow-400 uppercase tracking-wide">Coffee Cafe</h3>
        <p class="text-gray-300 text-sm">Bangkok, Thailand</p>
        <p class="text-gray-400 text-xs">© 2025 Coffee Cafe. All rights reserved.</p>
      </div>

      <!-- Social -->
      <div class="flex gap-6">
        <a href="#" class="text-gray-200 hover:text-yellow-400 transition-transform duration-200 hover:-translate-y-1">Facebook</a>
      </div>
    </div>
  </footer>

  <!-- Loading -->
  <div v-if="!isReady" class="text-center mt-12 text-gray-800">Loading...</div>
</template>

<script setup lang="ts">
import { ref, onMounted, onActivated } from "vue";
import { useAuthStore } from "~/stores/auth";
import { useRouter } from "vue-router";

const auth = useAuthStore();
const router = useRouter();
const isReady = ref(false);
const menuOpen = ref(false);

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};

const rewards = ref([
  { id: 1, name: "Free Coffee", points: 20, image: "/coffee.png", expiry: "2025-12-31" },
  { id: 2, name: "Discount Voucher", points: 50, image: "/voucher.png", expiry: "2025-12-31" },
  { id: 3, name: "Free Cake", points: 60, image: "/cake.png", expiry: "2025-12-31" },
]);

const loadUserData = async () => {
  await auth.loadFromCookieOrStorage();
  isReady.value = true;
};

const handleRedeem = () => {
  router.push('/reward');
};

const goToReward = (item: { id: number }) => {
  router.push(`/reward/${item.id}`);
};

onMounted(loadUserData);
onActivated(loadUserData);
</script>

<style scoped>
/* Hero Section */
.hero-section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 700px; /* Desktop */
  padding: 0 1.5rem;
  margin-top: 60px;
  border-radius: 1.5rem;
  background: linear-gradient(to bottom right, #6B4226, #221210);
}

.hero-section h1 {
  line-height: 1.1;
  margin-bottom: 0.5rem;
}

/* Responsive Text */
.hero-section h1:nth-child(1) {
  font-size: 2rem; /* Wake Up */
}
.hero-section h1:nth-child(2) {
  font-size: 2.5rem; /* With Coffee */
}

.hero-section p {
  font-size: 1.125rem;
  color: rgba(255,255,255,0.8);
  margin-bottom: 1rem;
}

.hero-section h1.emoji {
  font-size: 5rem;
  color: rgba(255,255,255,0.5);
  margin-bottom: 1.5rem;
}

/* Image */
.hero-section img {
  width: 180px;
  height: auto;
  margin-top: 1.5rem;
  object-fit: contain;
  filter: drop-shadow(0 10px 10px rgba(0,0,0,0.4));
}

.hero-section h1:nth-child(1),
.hero-section h1:nth-child(2) {
  color: #ffffff;
}

/* Media Queries */
@media (min-width: 640px) {
  .hero-section {
    min-height: 800px;
    padding: 0 3rem;
  }
  .hero-section h1:nth-child(1) {
    font-size: 3rem;
  }
  .hero-section h1:nth-child(2) {
    font-size: 4rem;
  }
  .hero-section p {
    font-size: 1.25rem;
  }
  .hero-section h1.emoji {
    font-size: 6rem;
  }
  .hero-section img {
    width: 280px;
  }
}

@media (min-width: 1024px) {
  .hero-section {
    min-height: 700px;
  }
  .hero-section h1:nth-child(1) {
    font-size: 4rem;
  }
  .hero-section h1:nth-child(2) {
    font-size: 5rem;
  }
  .hero-section p {
    font-size: 1.5rem;
  }
  .hero-section h1.emoji {
    font-size: 8rem;
  }
  .hero-section img {
    width: 320px;
  }
}

/* -------- Reward Section -------- */
.rewards-section {
  background: #faf7f2;
  padding: 4rem 0;
}

/* Container */
.container-xl {
  max-width: 1200px;
  margin: 0 auto;
  overflow: hidden;
}

/* Title */
.rewards-section h2 {
  font-family: 'Poppins', sans-serif;
  color: #3e2723;
  text-align: center;
  font-size: 2rem;
  font-weight: 700;
  position: relative;
  margin-bottom: 2.5rem;
}

.rewards-section h2::after {
  content: "";
  display: block;
  width: 80px;
  height: 4px;
  background: linear-gradient(90deg, #fbbf24, #f59e0b);
  margin: 0.5rem auto 0 auto;
  border-radius: 999px;
}

/* Scroll container */
.rewards-section .flex {
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  scroll-behavior: smooth;
  gap: 1.5rem;
  padding-bottom: 1rem;
  -webkit-overflow-scrolling: touch;
}

/* ซ่อน scrollbar */
.rewards-section .flex::-webkit-scrollbar {
  height: 6px;
}
.rewards-section .flex::-webkit-scrollbar-track {
  background: #f3f3f3;
  border-radius: 999px;
}
.rewards-section .flex::-webkit-scrollbar-thumb {
  background: linear-gradient(90deg, #fcd34d, #f59e0b);
  border-radius: 999px;
}

/* -------- Reward Cards -------- */
.reward-item {
  flex-shrink: 0;
  background: #fff;
  border-radius: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  min-width: 200px;
  max-width: 220px;
  cursor: pointer;
}

.reward-item:hover {
  transform: translateY(-6px) scale(1.02);
  box-shadow: 0 10px 20px rgba(245, 158, 11, 0.3);
}

/* Image */
.reward-item img {
  width: 100%;
  height: 150px;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.reward-item:hover img {
  transform: scale(1.05);
}

/* Texts */
.reward-item .p-3 {
  padding: 1rem;
  text-align: center;
}

.reward-item h5 {
  font-size: 1.1rem;
  color: #d97706;
  font-weight: 600;
}

.reward-item p {
  margin: 0.25rem 0;
  font-size: 0.9rem;
  color: #555;
}

/* Responsive */
@media (max-width: 768px) {
  .rewards-section {
    padding: 3rem 1rem;
  }
  .reward-item {
    min-width: 160px;
  }
  .reward-item img {
    height: 120px;
  }
  .rewards-section h2 {
    font-size: 1.75rem;
  }
}

/* Navbar */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  z-index: 50;
}

.navbar-left {
  display: flex;
  align-items: center;
  gap: 1rem;
}

/* Hamburger button */
.hamburger {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 24px;
  height: 18px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  margin-left: 1rem;
}

.hamburger span {
  display: block;
  height: 3px;
  width: 100%;
  background-color: #333;
  border-radius: 2px;
}

/* Nav menu */
.nav-menu {
  display: flex;
  gap: 1.5rem;
}

/* Links */
.nav-link {
  font-weight: 600;
  color: #333;
  padding: 0.5rem 0.75rem;
  text-decoration: none;
  transition: all 0.2s;
}

.nav-link:hover {
  color: #f59e0b;
}

.nav-link.active {
  border-bottom: 2px solid #f59e0b;
}

.navbar-right {
  font-weight: 600;
  color: #f59e0b;
}

/* --- Responsive --- */
@media (max-width: 768px) {
  .hamburger {
    display: flex;
  }
  .nav-menu {
    position: absolute;
    top: 60px;
    left: 0;
    right: 0;
    background-color: #fff;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    max-height: 0;
    transition: max-height 0.3s ease;
  }
  .nav-menu.open {
    max-height: 300px;
  }
  .nav-link {
    padding: 1rem;
    width: 100%;
    text-align: center;
  }
}

/* Redeem Button */
.redeem-btn {
  padding: 0.75rem 2rem;
  background: linear-gradient(135deg, #facc15, #f59e0b);
  color: #000;
  font-weight: 600;
  font-size: 1.125rem;
  border-radius: 9999px;
  box-shadow: 0 6px 15px rgba(0,0,0,0.2);
  transition: all 0.3s ease;
  cursor: pointer;
  user-select: none;
}

.redeem-btn:hover {
  transform: translateY(-3px) scale(1.05);
  background: linear-gradient(135deg, #fcd34d, #fbbf24);
  box-shadow: 0 8px 20px rgba(0,0,0,0.25);
}

.redeem-btn:active {
  transform: translateY(1px) scale(0.98);
  box-shadow: 0 4px 10px rgba(0,0,0,0.2);
}

/* ===== Footer Section ===== */
footer {
  background: #221210;
  color: #fff;
  padding: 2rem 1.5rem;
  font-family: 'Poppins', sans-serif;
  font-size: 0.9rem;
}

footer .container-xl {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

footer h3 {
  font-size: 1.2rem;
  font-weight: 600;
  color: #fff;
  margin-bottom: 0.5rem;
}

footer p {
  color: #d1d5db;
  line-height: 1.4;
  margin: 0.25rem 0;
}

footer .social-links {
  display: flex;
  gap: 1rem;
}

footer .social-links a {
  color: #fff;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.2s, transform 0.2s;
}

footer .social-links a:hover {
  color: #bbb;
  transform: translateY(-1px);
}

/* Divider Line (optional, subtle) */
footer::before {
  content: "";
  display: block;
  width: 40px;
  height: 2px;
  margin: 0 auto 0.75rem auto;
  background: #fff5;
  border-radius: 999px;
}

/* ===== Responsive Design ===== */
@media (min-width: 768px) {
  footer .container-xl {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    text-align: left;
  }
}
</style>
