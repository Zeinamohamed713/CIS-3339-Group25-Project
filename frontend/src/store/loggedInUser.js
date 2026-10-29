// This pinia store contains state with respect to whether a user is logged in
import { defineStore } from 'pinia'
import { useToast } from 'vue-toastification'

import {
  loginUser,
  logoutUser,
  setAuthHeader
} from '../api/api'

import jwt_decode from 'jwt-decode'


// ======================================================
// NOTIFICATIONS
// ======================================================

const toast = useToast()


// ======================================================
// USER STORE
// ======================================================

export const useLoggedInUserStore = defineStore({
  id: 'loggedInUser',

  state: () => {
    return {
      name: '',
      role: '',
      isLoggedIn: false
    }
  },


  actions: {

    // ==================================================
    // LOGIN
    // ==================================================

    async login(username, password) {
      try {
        const token =
          await loginUser(
            username,
            password
          )

        const decodedToken =
          jwt_decode(token)

        this.$patch({
          isLoggedIn: true,
          role: decodedToken.role,
          name: decodedToken.username
        })


        /*
         * If the user originally tried to visit
         * a protected page, send them there after
         * successful login.
         *
         * Otherwise send them to the dashboard.
         */

        const redirect =
          this.$router.currentRoute.value
            .query.redirect

        if (
          typeof redirect === 'string' &&
          redirect.startsWith('/')
        ) {
          await this.$router.push(
            redirect
          )
        } else {
          await this.$router.push(
            '/dashboard'
          )
        }


        toast.success(
          'Login Successful!'
        )
      } catch (error) {
        toast.error(
          error.message
        )
      }
    },


    // ==================================================
    // RESTORE SESSION
    // ==================================================

    restoreSession() {
      const token =
        localStorage.getItem(
          'authToken'
        )

      // No saved token
      if (!token) {
        this.$patch({
          name: '',
          role: '',
          isLoggedIn: false
        })

        return false
      }

      try {
        const decodedToken =
          jwt_decode(token)

        // JWT expiration time is stored in seconds
        const currentTime =
          Math.floor(
            Date.now() / 1000
          )

        // Missing or expired expiration value
        if (
          !decodedToken.exp ||
          decodedToken.exp <= currentTime
        ) {
          logoutUser()

          this.$patch({
            name: '',
            role: '',
            isLoggedIn: false
          })

          return false
        }


        // Restore Axios Authorization header
        setAuthHeader(token)


        // Restore Pinia state
        this.$patch({
          isLoggedIn: true,
          role: decodedToken.role,
          name: decodedToken.username
        })

        return true
      } catch (error) {

        // Corrupted or invalid token
        logoutUser()

        this.$patch({
          name: '',
          role: '',
          isLoggedIn: false
        })

        return false
      }
    },


    // ==================================================
    // LOGOUT
    // ==================================================

    async logout() {
      logoutUser()

      this.$patch({
        name: '',
        role: '',
        isLoggedIn: false
      })


      /*
       * Logout returns the user to the
       * public Community Center landing page.
       */

      await this.$router.push('/')


      toast.info(
        'You have been logged out!'
      )
    }
  }
})