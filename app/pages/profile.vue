<template>
  <div class="profile-page">
    <!-- Header -->
    <header class="profile-header">
      <button @click="router.push('/')" class="back-btn">← Home</button>
      <h2>My Profile</h2>
    </header>

    <main v-if="auth.authenticated" class="profile-content">
      <!-- User Info Card -->
      <div class="user-card">
        <div class="avatar">
          <span>{{ auth.username?.[0]?.toUpperCase() ?? '?' }}</span>
        </div>
        <div class="user-info">
          <p class="username">{{ auth.username }}</p>
          <p class="points">{{ auth.points }} pts</p>
        </div>
      </div>

      <!-- Redeemed Rewards -->
      <section class="redeemed-section">
        <h3>Redeemed Rewards</h3>
        <ul v-if="auth.redeemedIds.length" class="redeemed-list">
          <li v-for="id in auth.redeemedIds" :key="id" class="redeemed-item">
            🎁 Reward ID: {{ id }}
          </li>
        </ul>
        <p v-else class="no-rewards">ยังไม่มีรายการแลกรางวัล</p>
      </section>

      <button class="logout-btn" @click="logout">Logout</button>
    </main>

    <div v-else class="login-prompt">
      <p>กรุณาเข้าสู่ระบบก่อนดูโปรไฟล์</p>
      <NuxtLink to="/login" class="login-btn">เข้าสู่ระบบ</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

const logout = () => {
  auth.logout()
  router.push('/')
}
</script>

<style scoped lang="scss">
.profile-page {
  min-height: 100vh;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f9f7f5;
  font-family: 'Poppins', sans-serif;

  .profile-header {
    width: 100%;
    max-width: 600px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;

    h2 {
      font-size: 1.8rem;
      font-weight: 700;
      color: #333;
    }

    .back-btn {
      background: none;
      border: 2px solid #ccc;
      padding: 0.5rem 1rem;
      border-radius: 9999px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;

      &:hover {
        background-color: #eee;
      }
    }
  }

  .profile-content {
    width: 100%;
    max-width: 600px;
    display: flex;
    flex-direction: column;
    gap: 20px;

    .user-card {
      display: flex;
      align-items: center;
      background: #fff;
      border-radius: 1rem;
      padding: 16px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.05);

      .avatar {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: #d1c4b1;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
        font-weight: bold;
        color: #fff;
        margin-right: 16px;
      }

      .user-info {
        .username {
          font-size: 1.2rem;
          font-weight: 600;
          color: #333;
        }
        .points {
          font-size: 1rem;
          color: #666;
        }
      }
    }

    .redeemed-section {
      h3 {
        font-size: 1.2rem;
        font-weight: 600;
        color: #555;
        margin-bottom: 8px;
      }

      .redeemed-list {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        list-style: none;
        padding: 0;

        .redeemed-item {
          background: #f1f0ed;
          padding: 8px 12px;
          border-radius: 12px;
          font-size: 0.9rem;
        }
      }

      .no-rewards {
        color: #999;
        font-style: italic;
      }
    }

    .logout-btn {
      align-self: center;
      padding: 0.6rem 1.5rem;
      background-color: #c0392b;
      color: #fff;
      border-radius: 9999px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;

      &:hover {
        background-color: #e74c3c;
      }
    }
  }

  .login-prompt {
    text-align: center;
    margin-top: 60px;

    .login-btn {
      display: inline-block;
      padding: 0.6rem 1.5rem;
      border-radius: 9999px;
      background-color: #333;
      color: #fff;
      font-weight: 600;
      text-decoration: none;
      transition: all 0.2s;

      &:hover {
        background-color: #555;
      }
    }
  }
}

/* Responsive */
@media (max-width: 640px) {
  .profile-page {
    padding: 12px;

    .profile-header {
      flex-direction: column;
      align-items: flex-start;

      .back-btn {
        margin-bottom: 8px;
      }
    }
  }
}
</style>
