<template>
  <main class="min-h-screen bg-slate-100">

    <!-- ====================================================== -->
    <!-- FLOATING TOP NAVIGATION -->
    <!-- ====================================================== -->

    <header
      class="fixed left-0 right-0 top-0 z-50 px-4 pt-4 md:px-8"
    >
      <nav
        class="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-slate-700/70 bg-slate-950/95 px-5 py-3 text-white shadow-2xl backdrop-blur md:px-7"
      >

        <!-- ================================================== -->
        <!-- BRAND -->
        <!-- ================================================== -->

        <router-link
          :to="user.isLoggedIn ? '/dashboard' : '/'"
          class="flex items-center gap-3"
        >
          <div
            class="flex h-10 w-10 items-center justify-center rounded-full bg-red-700 text-lg font-black"
          >
            C
          </div>

          <div class="hidden sm:block">
            <p class="text-lg font-black tracking-tight">
              {{ orgName }}
            </p>

            <p
              class="text-xs uppercase tracking-[0.2em] text-slate-400"
            >
              Data Platform
            </p>
          </div>
        </router-link>


        <!-- ================================================== -->
        <!-- PUBLIC NAVIGATION -->
        <!-- ================================================== -->

        <div
          v-if="!user.isLoggedIn"
          class="flex items-center gap-2 md:gap-5"
        >
          <router-link
            :to="{ path: '/', hash: '#about' }"
            class="hidden text-sm font-bold uppercase tracking-wide text-slate-200 transition hover:text-white md:inline"
          >
            About
          </router-link>

          <router-link
            :to="{ path: '/', hash: '#services' }"
            class="hidden text-sm font-bold uppercase tracking-wide text-slate-200 transition hover:text-white md:inline"
          >
            Services
          </router-link>

          <router-link
            :to="{ path: '/', hash: '#events' }"
            class="hidden text-sm font-bold uppercase tracking-wide text-slate-200 transition hover:text-white md:inline"
          >
            Events
          </router-link>

          <router-link
            to="/login"
            class="rounded-full bg-red-700 px-5 py-2.5 text-sm font-black text-white transition hover:bg-red-600"
          >
            Login
          </router-link>
        </div>


        <!-- ================================================== -->
        <!-- AUTHENTICATED NAVIGATION -->
        <!-- ================================================== -->

        <div
          v-else
          class="flex items-center gap-2 md:gap-4"
        >
          <router-link
            to="/dashboard"
            class="hidden text-sm font-bold uppercase tracking-wide text-slate-200 transition hover:text-white md:inline"
          >
            Dashboard
          </router-link>

          <router-link
            to="/findevents"
            class="hidden text-sm font-bold uppercase tracking-wide text-slate-200 transition hover:text-white lg:inline"
          >
            Events
          </router-link>

          <router-link
            to="/findservice"
            class="hidden text-sm font-bold uppercase tracking-wide text-slate-200 transition hover:text-white lg:inline"
          >
            Services
          </router-link>

          <router-link
            to="/findclient"
            class="hidden text-sm font-bold uppercase tracking-wide text-slate-200 transition hover:text-white lg:inline"
          >
            Clients
          </router-link>


          <!-- ================================================ -->
          <!-- EDITOR MENU -->
          <!-- ================================================ -->

          <div
            v-if="user.role === 'editor'"
            class="hidden items-center gap-4 xl:flex"
          >
            <router-link
              to="/clientform"
              class="text-sm font-bold uppercase tracking-wide text-slate-400 transition hover:text-white"
            >
              Add Client
            </router-link>

            <router-link
              to="/eventform"
              class="text-sm font-bold uppercase tracking-wide text-slate-400 transition hover:text-white"
            >
              Add Event
            </router-link>

            <router-link
              to="/serviceform"
              class="text-sm font-bold uppercase tracking-wide text-slate-400 transition hover:text-white"
            >
              Add Service
            </router-link>
          </div>


          <!-- ================================================ -->
          <!-- LOGOUT -->
          <!-- ================================================ -->

          <button
            type="button"
            class="rounded-full bg-red-700 px-5 py-2.5 text-sm font-black text-white transition hover:bg-red-600"
            @click="handleLogout"
          >
            Logout
          </button>
        </div>
      </nav>
    </header>


    <!-- ====================================================== -->
    <!-- PAGE CONTENT -->
    <!-- ====================================================== -->

    <section
      :class="
        isLandingPage
          ? 'pt-0'
          : 'pt-24'
      "
    >
      <router-view />
    </section>

  </main>
</template>


<script setup>
import {
  computed,
  onMounted,
  ref
} from 'vue'

import {
  useRoute,
  useRouter
} from 'vue-router'

import { useLoggedInUserStore } from './store/loggedInUser'
import { getOrgName } from './api/api'


// ======================================================
// ROUTER
// ======================================================

const route = useRoute()
const router = useRouter()


// ======================================================
// USER STORE
// ======================================================

const user = useLoggedInUserStore()


// ======================================================
// ORGANIZATION
// ======================================================

const orgName =
  ref('Community Center')


// ======================================================
// PAGE STATE
// ======================================================

const isLandingPage = computed(
  () => route.name === 'landing'
)


// ======================================================
// LOGOUT
// ======================================================

async function handleLogout() {
  await user.logout()

  await router.push('/')
}


// ======================================================
// LOAD ORGANIZATION
// ======================================================

onMounted(async () => {
  /*
   * The public landing page does not need to call
   * a potentially protected organization endpoint.
   *
   * It simply displays "Community Center".
   *
   * Once authenticated, we load the actual
   * organization name from the backend.
   */

  if (!user.isLoggedIn) {
    return
  }

  try {
    orgName.value =
      await getOrgName()
  } catch (error) {
    console.error(
      'Unable to load organization name:',
      error
    )
  }
})
</script>