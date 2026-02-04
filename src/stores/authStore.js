import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { db, auth } from '@/utility/firebaseConfig'
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'
import { ROLE_USER, ROLE_ADMIN } from '@/constants/appConstants'

export const useAuthStore = defineStore('authStore', () => {
  // STATE
  const user = ref(null)
  const role = ref(null)
  const error = ref(null)
  const isLoading = ref(false)
  const initialized = ref(false)

  // COMPUTED
  const isAuthenticated = computed(() => !!user.value)
  const isAdmin = computed(() => role.value === ROLE_ADMIN)

  // HELPERS
  const clearUser = () => {
    user.value = null
    role.value = null
  }

  // INIT AUTH (persistencia)
  const initializeAuth = () => {
    return new Promise((resolve) => {
      onAuthStateChanged(auth, async (firebaseUser) => {
        if (firebaseUser) {
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid))

          if (userDoc.exists()) {
            user.value = {
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              ...userDoc.data(),
            }
            role.value = userDoc.data().role
          } else {
            clearUser()
          }
        } else {
          clearUser()
        }

        initialized.value = true
        resolve()
      })
    })
  }

  // SIGN UP
  const signUpUser = async (email, password) => {
    isLoading.value = true
    try {
      const userCredentials = await createUserWithEmailAndPassword(auth, email, password)

      await setDoc(doc(db, 'users', userCredentials.user.uid), {
        email: userCredentials.user.email,
        role: ROLE_USER,
        createdAt: serverTimestamp(),
      })

      user.value = {
        uid: userCredentials.user.uid,
        email: userCredentials.user.email,
        role: ROLE_USER,
      }

      role.value = ROLE_USER
      error.value = null
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      isLoading.value = false
    }
  }

  // SIGN IN
  const signInUser = async (email, password) => {
    isLoading.value = true
    try {
      const userCredentials = await signInWithEmailAndPassword(auth, email, password)

      const userDoc = await getDoc(doc(db, 'users', userCredentials.user.uid))

      if (!userDoc.exists()) {
        throw new Error('Usuario no existe en Firestore')
      }

      user.value = {
        uid: userCredentials.user.uid,
        email: userCredentials.user.email,
        ...userDoc.data(),
      }

      role.value = userDoc.data().role
      error.value = null
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      isLoading.value = false
    }
  }

  // SIGN OUT
  const signOutUser = async () => {
    isLoading.value = true
    try {
      await signOut(auth)
      clearUser()
      error.value = null
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      isLoading.value = false
    }
  }

  return {
    user,
    role,
    error,
    isLoading,
    initialized,
    isAuthenticated,
    isAdmin,
    initializeAuth,
    signUpUser,
    signInUser,
    signOutUser,
  }
})
