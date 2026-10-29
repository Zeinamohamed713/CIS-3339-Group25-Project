<template>
  <main class="min-h-screen overflow-hidden bg-slate-950 text-white">
    <div class="grid min-h-screen grid-cols-1 lg:grid-cols-2">

      <!-- ====================================================== -->
      <!-- LEFT / HERO -->
      <!-- ====================================================== -->

      <section
        class="relative flex items-center bg-red-700 px-8 py-14 md:px-14 lg:px-16 xl:px-20"
      >
        <!-- Decorative shapes -->
        <div
          class="absolute -left-24 -top-24 h-72 w-72 rounded-full border border-white/20"
        ></div>

        <div
          class="absolute right-10 top-20 h-32 w-32 rounded-full bg-white/10"
        ></div>

        <div
          class="absolute -bottom-24 right-16 h-64 w-64 rounded-full bg-white/10"
        ></div>

        <div class="relative z-10 max-w-2xl">
          <p
            class="text-sm font-bold uppercase tracking-[0.35em] text-red-100 md:text-base"
          >
            Community Center
          </p>

          <h1
            class="mt-6 text-5xl font-black leading-[0.95] tracking-tight sm:text-6xl md:text-7xl xl:text-8xl"
          >
            COMMUNITY
            <br />
            STARTS
            <br />
            HERE.
          </h1>

          <p
            class="mt-8 max-w-xl text-lg leading-relaxed text-red-100 md:text-xl"
          >
            Connect people with events, services, and community resources
            through one shared platform.
          </p>

          <div
            class="mt-10 flex flex-wrap gap-3 text-sm font-semibold"
          >
            <span
              class="rounded-full border border-white/30 bg-white/10 px-4 py-2"
            >
              Events
            </span>

            <span
              class="rounded-full border border-white/30 bg-white/10 px-4 py-2"
            >
              Services
            </span>

            <span
              class="rounded-full border border-white/30 bg-white/10 px-4 py-2"
            >
              Community
            </span>
          </div>
        </div>
      </section>


      <!-- ====================================================== -->
      <!-- RIGHT / LOGIN -->
      <!-- ====================================================== -->

      <section
        class="flex items-center justify-center bg-slate-950 px-6 py-14 md:px-12"
      >
        <div class="w-full max-w-md">

          <!-- Back to Landing -->
          <router-link
            to="/"
            class="mb-8 inline-flex items-center gap-2 text-sm font-bold text-slate-400 transition hover:text-white"
          >
            <span>
              ←
            </span>

            Back to Community Center
          </router-link>


          <!-- Login Heading -->
          <div class="mb-10">
            <p
              class="text-sm font-bold uppercase tracking-[0.25em] text-red-500"
            >
              Member Access
            </p>

            <h2
              class="mt-3 text-4xl font-black tracking-tight md:text-5xl"
            >
              Welcome back.
            </h2>

            <p
              class="mt-4 text-lg text-slate-400"
            >
              Sign in to continue to your dashboard.
            </p>
          </div>


          <!-- ================================================== -->
          <!-- LOGIN FORM -->
          <!-- ================================================== -->

          <form
            class="space-y-6"
            novalidate
            @submit.prevent="store.login(username, password)"
          >

            <!-- Username -->
            <div>
              <label
                for="username"
                class="mb-2 block text-sm font-semibold text-slate-300"
              >
                Username
                <span class="text-red-500">
                  *
                </span>
              </label>

              <input
                id="username"
                v-model="username"
                type="text"
                autocomplete="username"
                placeholder="Enter your username"
                class="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-4 text-white shadow-sm outline-none transition placeholder:text-slate-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
              />
            </div>


            <!-- Password -->
            <div>
              <label
                for="password"
                class="mb-2 block text-sm font-semibold text-slate-300"
              >
                Password
                <span class="text-red-500">
                  *
                </span>
              </label>

              <input
                id="password"
                v-model="password"
                type="password"
                autocomplete="current-password"
                placeholder="Enter your password"
                class="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-4 text-white shadow-sm outline-none transition placeholder:text-slate-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
              />
            </div>


            <!-- Submit -->
            <button
              type="submit"
              class="w-full rounded-2xl bg-red-700 px-5 py-4 font-bold text-white transition hover:bg-red-600 active:scale-[0.99]"
            >
              Sign In
            </button>
          </form>


          <!-- ================================================== -->
          <!-- DEMO ACCESS -->
          <!-- ================================================== -->

          <div
            class="mt-8 rounded-2xl border border-slate-800 bg-slate-900/70 p-5"
          >
            <div
              class="flex items-center justify-between"
            >
              <p
                class="text-xs font-bold uppercase tracking-[0.2em] text-slate-500"
              >
                Demo Access
              </p>

              <span
                class="rounded-full bg-slate-800 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-slate-400"
              >
                CIS 3339
              </span>
            </div>

            <div
              class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2"
            >
              <!-- Viewer -->
              <div
                class="rounded-xl border border-slate-800 bg-slate-950/50 p-4"
              >
                <p
                  class="text-sm font-bold text-white"
                >
                  Viewer
                </p>

                <p
                  class="mt-2 text-sm text-slate-400"
                >
                  Username:
                  <span class="font-semibold text-slate-300">
                    user
                  </span>
                </p>

                <p
                  class="mt-1 text-sm text-slate-400"
                >
                  Password:
                  <span class="font-semibold text-slate-300">
                    user
                  </span>
                </p>
              </div>


              <!-- Editor -->
              <div
                class="rounded-xl border border-slate-800 bg-slate-950/50 p-4"
              >
                <p
                  class="text-sm font-bold text-white"
                >
                  Editor
                </p>

                <p
                  class="mt-2 text-sm text-slate-400"
                >
                  Username:
                  <span class="font-semibold text-slate-300">
                    admin
                  </span>
                </p>

                <p
                  class="mt-1 text-sm text-slate-400"
                >
                  Password:
                  <span class="font-semibold text-slate-300">
                    admin
                  </span>
                </p>
              </div>
            </div>
          </div>


          <!-- Footer -->
          <p
            class="mt-8 text-center text-xs text-slate-600"
          >
            Community Center Data Platform
          </p>
        </div>
      </section>

    </div>
  </main>
</template>


<script setup>
import { ref } from 'vue'
import { useLoggedInUserStore } from '../store/loggedInUser'

const store =
  useLoggedInUserStore()

const username =
  ref('')

const password =
  ref('')
</script>