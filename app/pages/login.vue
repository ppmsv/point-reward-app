<template>
  <ClientOnly>
    <div class="login-page d-flex justify-center align-center">
      <div class="container form bg-light">
        <div class="row main-row">

          <!-- SVG Illustration -->
          <div class="col-md-6 d-flex main-svg">
            <img src="/cafe.svg" alt="Illustration" class="svg-img" />
          </div>

          <!-- Login Form -->
          <div class="col-md-6 d-flex main-content">
            <div class="form-content">
              <h2 class="display-3 text-center">
                Hola<span class="highlight">!</span>
              </h2>
              <p class="mb-4 text-center">
                You need to <strong>Sign In</strong> to access this website.
              </p>

              <form @submit.prevent="login">
                <div class="form-group">
                  <label>Username</label>
                  <input
                    v-model="user.username"
                    type="text"
                    class="form-control"
                    placeholder="Enter Username"
                  />
                </div>

                <div class="form-group mb-4">
                  <label>Password</label>
                  <input
                    v-model="user.password"
                    type="password"
                    class="form-control"
                    placeholder="Enter Password"
                  />
                </div>

                <div class="d-flex mb-4 align-items-center">
                  <label class="control control--checkbox mb-0">
                    <span class="caption">Remember me</span>
                    <input type="checkbox" checked />
                    <div class="control__indicator"></div>
                  </label>
                  <span class="ml-auto">
                    <a href="#" class="forgot-pass">Forgot Password</a>
                  </span>
                </div>

                <button type="submit" class="btn btn-primary btn-block">
                  Log In
                </button>
              </form>

            </div>
          </div>
          
        </div>
      </div>
    </div>
  </ClientOnly>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '~/stores/auth'
import { useCookie } from '#app'

const router = useRouter()
const authStore = useAuthStore()
const auth = useAuthStore()
const user = ref({ username: '', password: '' })

onMounted(() => {
  if (auth.authenticated) {
    router.push('/') 
  }
})

const login = async () => {
  const success = await authStore.authenticateUser(user.value)
  if (success) {
    const token = useCookie('token', { maxAge: 60 * 60 * 24 })
    token.value = 'JWT_TOKEN_EXAMPLE'
    router.push('/')
  } else {
    alert('Login failed')
  }
}
</script>

<style lang="scss">
@import '~/assets/scss/pages/_login';
@import '~/assets/scss/_login_grid.scss';
@import '~/assets/scss/pages/_login.scss';
@import '~/assets/scss/_variables.scss';

/* Global Styles */
:global(body) {
  font-family: "Roboto", sans-serif;
  overflow-x: hidden;
}

p { color: #b3b3b3; font-weight: 300; }

h1, h2, h3, h4, h5, h6,
.h1, .h2, .h3, .h4, .h5, .h6 {
  font-family: "Roboto", sans-serif;
}

a {
  transition: .3s all ease;
  color: #c95fc2;
}
a:hover { text-decoration: none !important; color: #9e4998; }

/* Page & Container */
.page { width: 100vw; min-height: 100vh; }

.container {
  border-radius: 15px;
  max-width: 820px;
  max-height: 1024px;
  margin: 3rem;
  padding: 2rem;
  background-color: #c89900; 
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
}

.svg-img { max-width: 350px; height: auto; }

.main-svg { justify-content:end; }
.main-content { justify-content: start; }

.btn { background-color: #AD50A7; }
.btn:hover { background-color: #884083; }

/* Checkbox Control */
.control {
  display: block;
  position: relative;
  padding-left: 30px;
  margin-bottom: 15px;
  cursor: pointer;
  font-size: 14px;
}
.control .caption { position: relative; top: .2rem; color: #888; }
.control input { position: absolute; z-index: -1; opacity: 0; }
.control__indicator {
  position: absolute; top: 2px; left: 0;
  height: 20px; width: 20px;
  background: #e6e6e6; border-radius: 4px;
}
.control--checkbox .control__indicator:after {
  content: '\e5ca'; display: none; font-size: 16px; position: absolute;
}
.control input:checked ~ .control__indicator { background: #AD50A7; }
.control input:checked ~ .control__indicator:after { display: block; color: #fff; }

/* Form Control Focus */
.form-control:focus {
  border-color: #c960c2;
  box-shadow: inset 0 1px 1px rgba(255,255,255,0.644), 0 0 8px #c960c2;
}

/* Responsive */
@media screen and (max-width: 768px) {
  .main-svg, .main-content { justify-content: center; }
}

@media screen and (max-width: 400px) {
  .row { text-align: center; justify-content: center; }
  .container { max-width: 100vw; margin: 1rem; padding: 1rem; }
  .svg-img { max-width: 200px; height: auto; }
  .form-group { text-align: left; }
}
</style>
