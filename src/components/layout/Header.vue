<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <img src="../../assets/logo.png" style="width: 40px" class="mx-3" alt="ShopOpedia" />

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <!-- LEFT MENU -->
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link active" :to="{ name: APP_ROUTE_NAMES.HOME }">
              Home
            </router-link>
          </li>

          <li class="nav-item">
            <router-link class="nav-link active" :to="{ name: APP_ROUTE_NAMES.PRODUCT_LIST }">
              Product
            </router-link>
          </li>

          <li class="nav-item">
            <router-link class="nav-link active" :to="{ name: APP_ROUTE_NAMES.CONTACT_US }">
              Contact Us
            </router-link>
          </li>
        </ul>

        <!-- RIGHT MENU -->
        <ul class="navbar-nav d-flex">
          <li class="nav-link" v-if="authStore.isAuthenticated">
            Welcome, {{ authStore.user?.email }}
          </li>
          <!-- THEME -->
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">
              <i class="bi bi-laptop"></i>
            </a>

            <ul class="dropdown-menu">
              <li>
                <button class="dropdown-item" @click="themeStore.setTheme('light')">
                  <i class="bi bi-sun"></i>&nbsp; Light
                </button>
              </li>

              <li>
                <button class="dropdown-item" @click="themeStore.setTheme('dark')">
                  <i class="bi bi-moon-stars-fill"></i>&nbsp; Dark
                </button>
              </li>
            </ul>
          </li>

          <!-- NOT AUTHENTICATED -->
          <li class="nav-item" v-if="!authStore.isAuthenticated">
            <router-link class="nav-link active" :to="{ name: APP_ROUTE_NAMES.SING_IN }">
              Sign In
            </router-link>
          </li>

          <li class="nav-item" v-if="!authStore.isAuthenticated">
            <router-link class="nav-link active" :to="{ name: APP_ROUTE_NAMES.SING_UP }">
              Sign Up
            </router-link>
          </li>

          <!-- AUTHENTICATED -->
          <li class="nav-item" v-if="authStore.isAuthenticated">
            <button class="nav-link" @click="logout">Sign Out</button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { APP_ROUTE_NAMES } from '@/constants/routeNames'
import { useThemeStore } from '@/stores/themeStore'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'

const themeStore = useThemeStore()
const authStore = useAuthStore()
const router = useRouter()

const logout = () => {
  authStore.signOutUser()
  router.push({ name: APP_ROUTE_NAMES.HOME })
}
</script>
