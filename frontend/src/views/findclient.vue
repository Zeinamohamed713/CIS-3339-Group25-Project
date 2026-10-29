<!-- This view displays a list of clients.
The user can search for clients and click a client to view details. -->

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
            Client Management
          </p>

          <h1 class="mt-2 text-4xl font-black tracking-tight text-slate-900">
            Clients
          </h1>

          <p class="mt-2 text-slate-500">
            Search for clients and open a record to view more information.
          </p>
        </div>

        <!-- ADMIN ONLY -->
        <router-link
          v-if="user.role === 'editor'"
          to="/clientform"
          class="inline-flex items-center justify-center rounded-full bg-red-700 px-6 py-3 font-bold text-white shadow-sm transition hover:bg-red-600"
        >
          <span class="mr-2 text-xl">+</span>
          Create Client
        </router-link>
      </div>

      <!-- Search Card -->
      <section
        class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8"
      >
        <div class="mb-6">
          <h2 class="text-xl font-bold text-slate-900">
            Search Clients
          </h2>

          <p class="mt-1 text-sm text-slate-500">
            Search by client name or phone number.
          </p>
        </div>

        <div
          class="grid grid-cols-1 gap-5 md:grid-cols-3"
        >
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

              <option value="Client Name">
                Client Name
              </option>

              <option value="Client Number">
                Client Number
              </option>
            </select>
          </div>

          <!-- Search by Name -->
          <template v-if="searchBy === 'Client Name'">
            <div class="flex flex-col">
              <label
                for="firstName"
                class="mb-2 text-sm font-semibold text-slate-700"
              >
                First Name
              </label>

              <input
                id="firstName"
                v-model="firstName"
                type="text"
                class="rounded-xl border border-slate-300 px-4 py-3 shadow-sm outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                placeholder="Enter first name"
                @keyup.enter="handleSubmitForm"
              />
            </div>

            <div class="flex flex-col">
              <label
                for="lastName"
                class="mb-2 text-sm font-semibold text-slate-700"
              >
                Last Name
              </label>

              <input
                id="lastName"
                v-model="lastName"
                type="text"
                class="rounded-xl border border-slate-300 px-4 py-3 shadow-sm outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                placeholder="Enter last name"
                @keyup.enter="handleSubmitForm"
              />
            </div>
          </template>

          <!-- Search by Phone -->
          <div
            v-if="searchBy === 'Client Number'"
            class="flex flex-col md:col-span-2"
          >
            <label
              for="phoneNumber"
              class="mb-2 text-sm font-semibold text-slate-700"
            >
              Client Phone Number
            </label>

            <input
              id="phoneNumber"
              v-model="phoneNumber"
              type="text"
              class="rounded-xl border border-slate-300 px-4 py-3 shadow-sm outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
              placeholder="Enter client phone number"
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
            Search Client
          </button>
        </div>
      </section>

      <!-- Client List -->
      <section
        class="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8"
      >
        <div class="mb-6">
          <h2 class="text-2xl font-black text-slate-900">
            Client Directory
          </h2>

          <p class="mt-1 text-sm text-slate-500">
            Click a table row to view client details.
          </p>
        </div>

        <!-- Loading -->
        <div
          v-if="loading"
          class="rounded-2xl bg-slate-50 p-10 text-center text-lg font-semibold text-slate-500"
        >
          Loading clients...
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
          :columns="clientColumns"
          :rows="clients"
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
  getClients,
  searchClients
} from '../api/api'

const router = useRouter()
const user = useLoggedInUserStore()

const searchBy = ref('')
const firstName = ref('')
const lastName = ref('')
const phoneNumber = ref('')

const {
  data,
  loading,
  error,
  execute,
  retry
} = useApi()

const clientColumns = [
  {
    key: 'fullName',
    label: 'Name'
  },
  {
    key: 'phoneNumber.primary',
    label: 'Phone Number'
  },
  {
    key: 'address.city',
    label: 'City'
  }
]

const clients = computed(() => {
  return (data.value || []).map((client) => ({
    ...client,
    fullName: `${client.firstName} ${client.lastName}`
  }))
})

// Remember the most recent API action for Retry
let lastApiCall = getClients
let lastArgs = []

async function loadClients() {
  lastApiCall = getClients
  lastArgs = []

  try {
    await execute(getClients)
  } catch (error) {
    // useApi already stores the error message
  }
}

async function loadData() {
  searchBy.value = ''
  firstName.value = ''
  lastName.value = ''
  phoneNumber.value = ''

  await loadClients()
}

async function handleSubmitForm() {
  if (searchBy.value === 'Client Name') {
    if (!firstName.value && !lastName.value) {
      return
    }

    const query = {
      searchBy: 'name',
      firstName: firstName.value,
      lastName: lastName.value
    }

    lastApiCall = searchClients
    lastArgs = [query]

    try {
      await execute(
        searchClients,
        query
      )
    } catch (error) {
      // useApi already stores the error message
    }
  } else if (searchBy.value === 'Client Number') {
    if (!phoneNumber.value) {
      return
    }

    const query = {
      searchBy: 'number',
      phoneNumber: phoneNumber.value
    }

    lastApiCall = searchClients
    lastArgs = [query]

    try {
      await execute(
        searchClients,
        query
      )
    } catch (error) {
      // useApi already stores the error message
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
    // useApi already stores the error message
  }
}

function handleRowClick(client) {
  router.push({
    name: 'clientdetails',
    params: {
      id: client._id
    }
  })
}

onMounted(() => {
  loadClients()
})
</script>