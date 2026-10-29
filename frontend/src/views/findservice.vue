<!-- This view shows a list of services.
Users can search for services and click on a service to view details. -->

<template>
  <main class="min-h-screen bg-slate-50">
    <div class="mx-auto max-w-7xl px-6 py-10">

      <!-- Page Header -->
      <div
        class="mb-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <p
            class="text-sm font-bold uppercase tracking-[0.2em] text-red-700"
          >
            Service Management
          </p>

          <h1 class="mt-2 text-4xl font-black tracking-tight text-slate-900">
            Services
          </h1>

          <p class="mt-2 text-slate-500">
            Search available services and open a record to view more information.
          </p>
        </div>

        <!-- ADMIN ONLY -->
        <router-link
          v-if="user.role === 'editor'"
          to="/serviceform"
          class="inline-flex items-center justify-center rounded-full bg-red-700 px-6 py-3 font-bold text-white shadow-sm transition hover:bg-red-600"
        >
          <span class="mr-2 text-xl">+</span>
          Create Service
        </router-link>
      </div>

      <!-- Search Card -->
      <section
        class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8"
      >
        <div class="mb-6">
          <h2 class="text-xl font-bold text-slate-900">
            Search Services
          </h2>

          <p class="mt-1 text-sm text-slate-500">
            Search by service name or description.
          </p>
        </div>

        <div class="grid grid-cols-1 gap-5 md:grid-cols-3">
          <!-- Search Type -->
          <div class="flex flex-col">
            <label
              for="searchBy"
              class="mb-2 text-sm font-semibold text-slate-700"
            >
              Search By
            </label>

            <select
              id="searchBy"
              v-model="searchBy"
              class="rounded-xl border border-slate-300 bg-white px-4 py-3 shadow-sm outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
            >
              <option value="">
                Select search type
              </option>

              <option value="Service Name">
                Service Name
              </option>

              <option value="Service Description">
                Service Description
              </option>
            </select>
          </div>

          <!-- Search by Service Name -->
          <div
            v-if="searchBy === 'Service Name'"
            class="flex flex-col md:col-span-2"
          >
            <label
              for="serviceName"
              class="mb-2 text-sm font-semibold text-slate-700"
            >
              Service Name
            </label>

            <input
              id="serviceName"
              v-model="name"
              type="text"
              class="rounded-xl border border-slate-300 px-4 py-3 shadow-sm outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
              placeholder="Enter service name"
              @keyup.enter="handleSubmitForm"
            />
          </div>

          <!-- Search by Description -->
          <div
            v-if="searchBy === 'Service Description'"
            class="flex flex-col md:col-span-2"
          >
            <label
              for="serviceDescription"
              class="mb-2 text-sm font-semibold text-slate-700"
            >
              Service Description
            </label>

            <input
              id="serviceDescription"
              v-model="description"
              type="text"
              class="rounded-xl border border-slate-300 px-4 py-3 shadow-sm outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
              placeholder="Enter service description"
              @keyup.enter="handleSubmitForm"
            />
          </div>
        </div>

        <!-- Search Actions -->
        <div
          class="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end"
        >
          <button
            type="button"
            class="rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
            @click="loadData"
          >
            Clear Search
          </button>

          <button
            type="button"
            class="rounded-xl bg-red-700 px-5 py-3 font-bold text-white transition hover:bg-red-600"
            @click="handleSubmitForm"
          >
            Search Service
          </button>
        </div>
      </section>

      <!-- Service List -->
      <section
        class="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8"
      >
        <div class="mb-6">
          <h2 class="text-2xl font-black text-slate-900">
            Service Directory
          </h2>

          <p class="mt-1 text-sm text-slate-500">
            Click a table row to view service details.
          </p>
        </div>

        <!-- Loading -->
        <div
          v-if="loading"
          class="rounded-2xl bg-slate-50 p-10 text-center text-lg font-semibold text-slate-500"
        >
          Loading services...
        </div>

        <!-- Error -->
        <div
          v-else-if="error"
          class="rounded-2xl border border-red-200 bg-red-50 p-6 text-center"
        >
          <p class="font-bold text-red-700">
            {{ error }}
          </p>

          <button
            type="button"
            class="mt-4 rounded-xl bg-red-700 px-5 py-3 font-bold text-white transition hover:bg-red-600"
            @click="retryLoad"
          >
            Retry
          </button>
        </div>

        <!-- Reusable DataTable -->
        <DataTable
          v-else
          :columns="serviceColumns"
          :rows="services"
          @row-click="handleRowClick"
        />
      </section>

    </div>
  </main>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import DataTable from '../components/DataTable.vue'
import { useApi } from '../composables/useApi'
import { useLoggedInUserStore } from '../store/loggedInUser'

import {
  getServices,
  searchServices
} from '../api/api'

const router = useRouter()
const user = useLoggedInUserStore()

const searchBy = ref('')
const name = ref('')
const description = ref('')

const {
  data,
  loading,
  error,
  execute,
  retry
} = useApi()

const serviceColumns = [
  {
    key: 'name',
    label: 'Service Name'
  },
  {
    key: 'description',
    label: 'Service Description'
  }
]

const services = computed(() => data.value || [])

let lastApiCall = getServices
let lastArgs = []

async function loadServices() {
  lastApiCall = getServices
  lastArgs = []

  try {
    await execute(getServices)
  } catch (error) {
    // useApi already stores the error
  }
}

async function loadData() {
  searchBy.value = ''
  name.value = ''
  description.value = ''

  await loadServices()
}

async function handleSubmitForm() {
  if (searchBy.value === 'Service Name') {
    if (!name.value) {
      return
    }

    const query = {
      searchBy: 'name',
      name: name.value
    }

    lastApiCall = searchServices
    lastArgs = [query]

    try {
      await execute(
        searchServices,
        query
      )
    } catch (error) {
      // useApi already stores the error
    }
  } else if (searchBy.value === 'Service Description') {
    if (!description.value) {
      return
    }

    const query = {
      searchBy: 'description',
      description: description.value
    }

    lastApiCall = searchServices
    lastArgs = [query]

    try {
      await execute(
        searchServices,
        query
      )
    } catch (error) {
      // useApi already stores the error
    }
  }
}

async function retryLoad() {
  try {
    await retry(
      lastApiCall,
      ...lastArgs
    )
  } catch (error) {
    // useApi already stores the error
  }
}

function handleRowClick(service) {
  router.push({
    name: 'servicedetails',
    params: {
      id: service._id
    }
  })
}

onMounted(() => {
  loadServices()
})
</script>