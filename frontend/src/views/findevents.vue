<!-- This view displays a list of events.
Users can search for events and click an event to view details. -->

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
            Event Management
          </p>

          <h1 class="mt-2 text-4xl font-black tracking-tight text-slate-900">
            Events
          </h1>

          <p class="mt-2 text-slate-500">
            Search events and open a record to view more information.
          </p>
        </div>

        <!-- ADMIN ONLY -->
        <router-link
          v-if="user.role === 'editor'"
          to="/eventform"
          class="inline-flex items-center justify-center rounded-full bg-red-700 px-6 py-3 font-bold text-white shadow-sm transition hover:bg-red-600"
        >
          <span class="mr-2 text-xl">+</span>
          Create Event
        </router-link>
      </div>

      <!-- Search Card -->
      <section
        class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8"
      >
        <div class="mb-6">
          <h2 class="text-xl font-bold text-slate-900">
            Search Events
          </h2>

          <p class="mt-1 text-sm text-slate-500">
            Search by event name or event date.
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

              <option value="Event Name">
                Event Name
              </option>

              <option value="Event Date">
                Event Date
              </option>
            </select>
          </div>

          <!-- Search by Event Name -->
          <div
            v-if="searchBy === 'Event Name'"
            class="flex flex-col md:col-span-2"
          >
            <label
              for="eventName"
              class="mb-2 text-sm font-semibold text-slate-700"
            >
              Event Name
            </label>

            <input
              id="eventName"
              v-model="name"
              type="text"
              class="rounded-xl border border-slate-300 px-4 py-3 shadow-sm outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
              placeholder="Enter event name"
              @keyup.enter="handleSubmitForm"
            />
          </div>

          <!-- Search by Event Date -->
          <div
            v-if="searchBy === 'Event Date'"
            class="flex flex-col md:col-span-2"
          >
            <label
              for="eventDate"
              class="mb-2 text-sm font-semibold text-slate-700"
            >
              Event Date
            </label>

            <input
              id="eventDate"
              v-model="eventDate"
              type="date"
              class="rounded-xl border border-slate-300 px-4 py-3 shadow-sm outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
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
            Search Event
          </button>
        </div>
      </section>

      <!-- Event List -->
      <section
        class="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8"
      >
        <div class="mb-6">
          <h2 class="text-2xl font-black text-slate-900">
            Event Directory
          </h2>

          <p class="mt-1 text-sm text-slate-500">
            Click a table row to view event details.
          </p>
        </div>

        <!-- Loading -->
        <div
          v-if="loading"
          class="rounded-2xl bg-slate-50 p-10 text-center text-lg font-semibold text-slate-500"
        >
          Loading events...
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
          :columns="eventColumns"
          :rows="events"
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
  getEvents,
  searchEvents
} from '../api/api'

const router = useRouter()
const user = useLoggedInUserStore()

const searchBy = ref('')
const name = ref('')
const eventDate = ref('')

const {
  data,
  loading,
  error,
  execute,
  retry
} = useApi()

const eventColumns = [
  {
    key: 'name',
    label: 'Event Name'
  },
  {
    key: 'formattedDate',
    label: 'Event Date'
  },
  {
    key: 'address.line1',
    label: 'Event Address'
  }
]

const events = computed(() => {
  return (data.value || []).map((event) => ({
    ...event,
    formattedDate: formatDate(event.date)
  }))
})

let lastApiCall = getEvents
let lastArgs = []

async function loadEvents() {
  lastApiCall = getEvents
  lastArgs = []

  try {
    await execute(getEvents)
  } catch (error) {
    // useApi already stores the error
  }
}

async function loadData() {
  searchBy.value = ''
  name.value = ''
  eventDate.value = ''

  await loadEvents()
}

async function handleSubmitForm() {
  if (searchBy.value === 'Event Name') {
    if (!name.value) {
      return
    }

    const query = {
      searchBy: 'name',
      name: name.value
    }

    lastApiCall = searchEvents
    lastArgs = [query]

    try {
      await execute(
        searchEvents,
        query
      )
    } catch (error) {
      // useApi already stores the error
    }
  } else if (searchBy.value === 'Event Date') {
    if (!eventDate.value) {
      return
    }

    const selectedDate = new Date(eventDate.value)

    const formattedDate = selectedDate
      .toISOString()
      .substring(0, 10)

    const query = {
      searchBy: 'date',
      eventDate: formattedDate
    }

    lastApiCall = searchEvents
    lastArgs = [query]

    try {
      await execute(
        searchEvents,
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

function formatDate(date) {
  const isoDate = new Date(date)

  const year = isoDate.getUTCFullYear()

  const month = String(
    isoDate.getUTCMonth() + 1
  ).padStart(2, '0')

  const day = String(
    isoDate.getUTCDate()
  ).padStart(2, '0')

  return `${month}/${day}/${year}`
}

function handleRowClick(event) {
  router.push({
    name: 'eventdetails',
    params: {
      id: event._id
    }
  })
}

onMounted(() => {
  loadEvents()
})
</script>