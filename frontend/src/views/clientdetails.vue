<!-- This view allows a user to view/update a specific client's information. -->

<template>
  <main>
    <!-- Header -->
    <h1 class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10">
      Client Details
    </h1>

    <div class="px-10 py-20">
      <!-- Personal Details -->
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
      >
        <h2 class="text-2xl font-bold">
          Personal Details
        </h2>

        <!-- First Name -->
        <div class="flex flex-col">
          <label class="block">
            <span class="text-gray-700">
              First Name
            </span>

            <span style="color: #ff0000">
              *
            </span>

            <input
              v-model="client.firstName"
              type="text"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </label>

          <span
            v-if="v$.client.firstName.$error"
            class="text-red-500"
          >
            First Name is required
          </span>
        </div>

        <!-- Middle Name -->
        <div class="flex flex-col">
          <label class="block">
            <span class="text-gray-700">
              Middle Name
            </span>

            <input
              v-model="client.middleName"
              type="text"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </label>
        </div>

        <!-- Last Name -->
        <div class="flex flex-col">
          <label class="block">
            <span class="text-gray-700">
              Last Name
            </span>

            <span style="color: #ff0000">
              *
            </span>

            <input
              v-model="client.lastName"
              type="text"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </label>

          <span
            v-if="v$.client.lastName.$error"
            class="text-red-500"
          >
            Last Name is required
          </span>
        </div>

        <div></div>

        <!-- Email -->
        <div class="flex flex-col">
          <label class="block">
            <span class="text-gray-700">
              Email
            </span>

            <input
              v-model="client.email"
              type="email"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </label>

          <span
            v-if="v$.client.email.$error"
            class="text-red-500"
          >
            Valid Email is required
          </span>
        </div>

        <!-- Phone Number -->
        <div class="flex flex-col">
          <label class="block">
            <span class="text-gray-700">
              Phone Number
            </span>

            <span style="color: #ff0000">
              *
            </span>

            <input
              v-model="client.phoneNumber.primary"
              type="text"
              pattern="^[0-9]{3}[0-9]{3}[0-9]{4}$"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </label>

          <span
            v-if="v$.client.phoneNumber.primary.$error"
            class="text-red-500"
          >
            <span
              v-if="v$.client.phoneNumber.primary.required.$invalid"
            >
              Phone Number is required
            </span>

            <span
              v-else-if="
                !v$.client.phoneNumber.primary.required.$invalid &&
                v$.client.phoneNumber.primary.numeric.$invalid
              "
            >
              Phone Number must contain only digits
            </span>

            <span
              v-else-if="
                !v$.client.phoneNumber.primary.required.$invalid &&
                !v$.client.phoneNumber.primary.numeric.$invalid &&
                (
                  v$.client.phoneNumber.primary.minLength.$invalid ||
                  v$.client.phoneNumber.primary.maxLength.$invalid
                )
              "
            >
              Phone Number must be exactly 10 digits
            </span>
          </span>
        </div>

        <!-- Alternate Phone -->
        <div class="flex flex-col">
          <label class="block">
            <span class="text-gray-700">
              Alternative Phone Number
            </span>

            <input
              v-model="client.phoneNumber.alternate"
              type="text"
              pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </label>
        </div>
      </div>

      <!-- Address Details -->
      <div
        class="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
      >
        <h2 class="text-2xl font-bold">
          Address Details
        </h2>

        <!-- Address Line 1 -->
        <div class="flex flex-col">
          <label class="block">
            <span class="text-gray-700">
              Address Line 1
            </span>

            <input
              v-model="client.address.line1"
              type="text"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </label>
        </div>

        <!-- Address Line 2 -->
        <div class="flex flex-col">
          <label class="block">
            <span class="text-gray-700">
              Address Line 2
            </span>

            <input
              v-model="client.address.line2"
              type="text"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </label>
        </div>

        <!-- City -->
        <div class="flex flex-col">
          <label class="block">
            <span class="text-gray-700">
              City
            </span>

            <span style="color: #ff0000">
              *
            </span>

            <input
              v-model="client.address.city"
              type="text"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </label>

          <span
            v-if="v$.client.address.city.$error"
            class="text-red-500"
          >
            City is required
          </span>
        </div>

        <div></div>

        <!-- County -->
        <div class="flex flex-col">
          <label class="block">
            <span class="text-gray-700">
              County
            </span>

            <input
              v-model="client.address.county"
              type="text"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </label>
        </div>

        <!-- Zip -->
        <div class="flex flex-col">
          <label class="block">
            <span class="text-gray-700">
              Zip Code
            </span>

            <input
              v-model="client.address.zip"
              type="text"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </label>
        </div>

        <div></div>
      </div>

      <!-- Client Actions -->
      <div
        class="mt-12 flex flex-col sm:flex-row items-center justify-end gap-4 border-t border-slate-200 pt-8"
      >
        <!-- Available to everyone -->
        <button
          type="button"
          class="rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
          @click="router.back()"
        >
          ← Go Back
        </button>

        <!-- Editor-only actions -->
        <template v-if="user.role === 'editor'">
          <button
            type="button"
            class="rounded-xl bg-slate-900 px-6 py-3 font-bold text-white transition hover:bg-slate-800"
            @click="submitUpdateClient"
          >
            Update Client
          </button>

          <button
            type="button"
            class="rounded-xl bg-red-700 px-6 py-3 font-bold text-white transition hover:bg-red-600"
            @click="submitDeleteClient"
          >
            Delete Client
          </button>
        </template>
      </div>
    </div>

    <hr class="mt-10 mb-10" />

    <!-- Client Event Information -->
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10 mr-10"
    >
      <div class="ml-10">
        <h2 class="text-2xl font-bold">
          Events for Client
        </h2>

        <h3 class="italic">
          Click table row to view event details
        </h3>
      </div>

      <div class="flex flex-col col-span-2">
        <table class="min-w-full shadow-md rounded">
          <thead class="bg-gray-50 text-xl">
            <tr>
              <th class="p-4 text-left">
                Event Name
              </th>

              <th class="p-4 text-left">
                Date
              </th>

              <th class="p-4"></th>
            </tr>
          </thead>

          <tbody class="divide-y divide-gray-300">
            <tr
              v-for="event in clientEvents"
              :key="event._id"
              class="cursor-pointer"
              :class="{ hoverRow: hoverId === event._id }"
              @click="goToEventDetails(event._id)"
              @mouseenter="hoverId = event._id"
              @mouseleave="hoverId = null"
            >
              <td class="p-2 text-left">
                {{ event.name }}
              </td>

              <td class="p-2 text-left">
                {{ formatDate(event.date) }}
              </td>

              <td class="p-2 text-right">
                <span class="remove-btn-wrapper">
                  <span
                    v-if="
                      hoverId === event._id &&
                      user.role === 'editor'
                    "
                    class="remove-btn text-gray-400 cursor-pointer"
                    @click.stop="
                      removeClientFromEvent(
                        client._id,
                        event._id
                      )
                    "
                  >
                    X
                  </span>
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Editor-only event registration -->
      <div
        v-if="user.role === 'editor'"
        class="flex flex-col"
      >
        <VueMultiselect
          v-model="eventsSelected"
          class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 cursor-pointer"
          :options="eventsFiltered"
          :custom-label="nameWithDate"
          :multiple="true"
          :close-on-select="true"
          placeholder="Select Events to be added"
          label="date"
          track-by="name"
        />

        <div class="flex justify-between">
          <button
            type="button"
            class="mt-5 rounded-xl bg-red-700 px-5 py-3 font-bold text-white transition hover:bg-red-600 disabled:opacity-50"
            :disabled="eventsSelected.length === 0"
            @click="addClientToEvent"
          >
            Add Client to Selected Events
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import useVuelidate from '@vuelidate/core'

import {
  required,
  email,
  numeric,
  minLength,
  maxLength
} from '@vuelidate/validators'

import VueMultiselect from 'vue-multiselect'
import { useToast } from 'vue-toastification'
import { useLoggedInUserStore } from '../store/loggedInUser'

import {
  getClientById,
  getClientEvents,
  getNonClientEvents,
  registerAttendee,
  deregisterAttendee,
  updateClient,
  deleteClientbyId
} from '../api/api'

const route = useRoute()
const router = useRouter()
const toast = useToast()
const user = useLoggedInUserStore()

const eventsFiltered = ref([])
const eventsSelected = ref([])
const clientEvents = ref([])
const hoverId = ref(null)

const client = reactive({
  _id: null,
  firstName: '',
  middleName: '',
  lastName: '',
  email: '',
  phoneNumber: {
    primary: '',
    alternate: ''
  },
  address: {
    line1: '',
    line2: '',
    city: '',
    county: '',
    zip: ''
  }
})

const rules = {
  client: {
    firstName: {
      required
    },
    lastName: {
      required
    },
    email: {
      required,
      email
    },
    phoneNumber: {
      primary: {
        required,
        numeric,
        minLength: minLength(10),
        maxLength: maxLength(10)
      }
    },
    address: {
      city: {
        required
      }
    }
  }
}

const v$ = useVuelidate(rules, { client })

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

function nameWithDate({ name, date }) {
  return `${name} (${formatDate(date)})`
}

function goToEventDetails(id) {
  router.push({
    name: 'eventdetails',
    params: { id }
  })
}

async function refreshEventLists() {
  try {
    clientEvents.value = await getClientEvents(
      route.params.id
    )

    eventsFiltered.value = await getNonClientEvents(
      route.params.id
    )
  } catch (error) {
    toast.error(error)
  }
}

async function removeClientFromEvent(
  clientId,
  eventId
) {
  try {
    const response = await deregisterAttendee(
      eventId,
      clientId
    )

    toast.success(response)

    await refreshEventLists()
  } catch (error) {
    toast.error(error)
  }
}

async function addClientToEvent() {
  try {
    const eventIds = eventsSelected.value.map(
      (event) => event._id
    )

    const promises = eventIds.map(
      (eventId) =>
        registerAttendee(
          eventId,
          client._id
        )
    )

    await Promise.all(promises)

    await refreshEventLists()

    eventsSelected.value = []
  } catch (error) {
    toast.error(error)
  }
}

async function submitUpdateClient() {
  await v$.value.$validate()

  if (v$.value.$error) {
    return
  }

  try {
    const response = await updateClient(
      route.params.id,
      client
    )

    toast.success(response)

    router.push('/findclient')
  } catch (error) {
    toast.error(error)
  }
}

async function submitDeleteClient() {
  try {
    const response = await deleteClientbyId(
      route.params.id
    )

    toast.success(response)

    router.push('/findclient')
  } catch (error) {
    toast.error(error)
  }
}

onMounted(async () => {
  try {
    const [
      clientResponse,
      clientEventsResponse,
      nonClientEventsResponse
    ] = await Promise.all([
      getClientById(route.params.id),
      getClientEvents(route.params.id),
      getNonClientEvents(route.params.id)
    ])

    Object.assign(
      client,
      clientResponse
    )

    clientEvents.value =
      clientEventsResponse

    eventsFiltered.value =
      nonClientEventsResponse
  } catch (error) {
    toast.error('Error loading client data')
    console.error(error)
  }
})
</script>

<!-- Style for multiselect -->
<style src="vue-multiselect/dist/vue-multiselect.css"></style>

<style scoped>
.remove-btn-wrapper {
  display: inline-block;
  position: relative;
}

.remove-btn:hover {
  color: black;
}
</style>