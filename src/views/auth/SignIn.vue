<template>
  <div class="container py-5">
    <div class="row justify-content-center">
      <div class="col-md-6 col-lg-4 border">
        <div class="shadow-sm">
          <div class="card-body p-4">
            <h4 class="text-center mb-4">Sign In</h4>

            <form @submit.prevent="handleSignIn">
              <!-- Email Field -->
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input
                  type="email"
                  v-model="form.email"
                  class="form-control"
                  id="email"
                  required
                  autocomplete="email"
                />
              </div>

              <!-- Password Field -->
              <div class="mb-4">
                <label for="password" class="form-label">Password</label>
                <input
                  type="password"
                  v-model="form.password"
                  class="form-control"
                  id="password"
                  required
                  autocomplete="current-password"
                />
              </div>

              <!-- Submit Button -->
              <button :disabled="authStore.isLoading" type="submit" class="btn btn-success w-100">
                <span
                  v-if="authStore.isLoading"
                  class="spinner-border spinner-border-sm me-2"
                ></span>
                Sign In
              </button>

              <!-- Error Message -->
              <div v-if="error" class="alert alert-danger mt-3 mb-0">
                {{ error }}
              </div>
            </form>

            <!-- Register Link -->
            <p class="mt-3 form-label text-center">
              Don't have an account?
              <router-link :to="APP_ROUTE_NAMES.SING_UP"> Register here </router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useSwal } from '@/composibles/useSwal'
import { APP_ROUTE_NAMES } from '@/constants/routeNames'
import { useAuthStore } from '@/stores/authStore'

const router = useRouter()
const error = ref('')
const authStore = useAuthStore()

const { showSuccess, showError } = useSwal()

const form = reactive({
  email: '',
  password: '',
})

const handleSignIn = async () => {
  try {
    error.value = ''
    await authStore.signInUser(form.email, form.password)
    showSuccess('Welcome back!')
    router.push({ name: APP_ROUTE_NAMES.HOME })
  } catch (err) {
    error.value = err.message
    showError(err.message)
  }
}
</script>
