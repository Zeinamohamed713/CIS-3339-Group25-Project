<!-- This component allows a user to update a specific event's information. -->

<template>
  <main>
    <div>
      <!-- Header -->
      <h1 class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10">
        Event Details
      </h1>
    </div>

    <div class="px-10 py-20">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
        <h2 class="text-2xl font-bold">Event Details</h2>

        <!-- Event Name -->
        <div class="flex flex-col">
          <label class="block">
            <span class="text-gray-700">Event Name</span>
            <span style="color: #ff0000">*</span>

            <input
              v-model="event.name"
              type="text"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />

            <span v-if="v$.event.name.$error" class="text-red-500">
              Event Name is required
            </span>
          </label>
        </div>

        <!-- Date -->
        <div class="flex flex-col">
          <label class="block">
            <span class="text-gray-700">Date</span>
            <span style="color: #ff0000">*</span>

            <input
              v-model="event.date"
              type="date"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />

            <span v-if="v$.event.date.$error" class="text-red-500">
              <span v-if="v$.event.date.required.$invalid">
                Event Date is required
              </span>

              <span
                v-else-if="
                  !v$.event.date.required.$invalid &&
                  v$.event.date.validDate.$invalid
                "
              >
                Event Date must be a valid date
              </span>
            </span>
          </label>
        </div>

        <div></div>
        <div></div>

        <!-- Description -->
        <div class="flex flex-col">
          <label class="block">
            <span class="text-gray-700">Description</span>

            <textarea
              v-model="event.description"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              rows="2"
            ></textarea>
          </label>
        </div>
      </div>

      <!-- Services Offered at Event -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10 mt-10">
        <h2 class="text-2xl font-bold">Services Offered at Event</h2>

        <div class="flex flex-col grid-cols-3">
          <div>
            <ul v-if="services.length" class="space-y-2">
              <li
                v-for="service in services"
                :key="service._id"
                :data-service-id="service._id"
                class="rounded-lg border border-gray-300 p-2 hover:bg-gray-100 transition-colors relative"
              >
                <label class="block w-full h-full">
                  <input
                    v-model="event.services"
                    type="checkbox"
                    :id="service._id"
                    :value="service._id"
                    :disabled="service.status === 'Inactive'"
                    class="rounded border-gray-300 disabled:opacity-50 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50 mr-2"
                  />

                  <span class="font-medium">
                    {{ service.name }}
                  </span>
                </label>
              </li>
            </ul>

            <p v-else class="text-gray-600">
              No Active Services Available
            </p>
          </div>
        </div>
      </div>

      <!-- Address -->
      <div class="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
        <h2 class="text-2xl font-bold">Address</h2>

        <div class="flex flex-col">
          <label class="block">
            <span class="text-gray-700">Address Line 1</span>

            <input
              v-model="event.address.line1"
              type="text"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </label>
        </div>

        <div class="flex flex-col">
          <label class="block">
            <span class="text-gray-700">Address Line 2</span>

            <input
              v-model="event.address.line2"
              type="text"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </label>
        </div>

        <div class="flex flex-col">
          <label class="block">
            <span class="text-gray-700">City</span>

            <input
              v-model="event.address.city"
              type="text"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </label>
        </div>

        <div></div>

        <div class="flex flex-col">
          <label class="block">
            <span class="text-gray-700">County</span>

            <input
              v-model="event.address.county"
              type="text"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </label>
        </div>

        <div class="flex flex-col">
          <label class="block">
            <span class="text-gray-700">Zip Code</span>

            <input
              v-model="event.address.zip"
              type="text"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </label>
        </div>
      </div>

      <!-- Buttons -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
        <div></div>

        <div class="flex justify-between mt-10 mr-20">
          <button
            type="button"
            class="bg-green-700 disabled:opacity-50 text-white rounded"
            :disabled="user.role === 'viewer'"
            @click="submitEventUpdate"
          >
            Update Event
          </button>
        </div>

        <div class="flex justify-between mt-10 mr-20">
          <button
            type="button"
            class="bg-red-700 disabled:opacity-50 text-white rounded"
            :disabled="user.role === 'viewer'"
            @click="submitDeleteEvent"
          >
            Delete Event
          </button>
        </div>

        <div class="flex justify-between mt-10 mr-20">
          <button
            type="button"
            class="border border-red-700 bg-white text-red-700 rounded"
            @click="router.back()"
          >
            Go back
          </button>
        </div>
      </div>

      <hr class="mt-10 mb-10" />

      <!-- Attendees -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
        <div>
          <h2 class="text-2xl font-bold">List of Attendees</h2>
          <h3 class="italic">Click table row to view client details</h3>
        </div>

        <div class="flex flex-col col-span-2">
          <table class="min-w-full shadow-md rounded">
            <thead class="bg-gray-50 text-xl">
              <tr>
                <th class="p-4 text-left">Name</th>
                <th class="p-4 text-left">City</th>
                <th class="p-4 text-left">Phone Number</th>
              </tr>
            </thead>

            <tbody class="divide-y divide-gray-300">
              <tr
                v-for="client in clients"
                :key="client._id"
                class="cursor-pointer"
                :class="{ hoverRow: hoverId === client._id }"
                @click="goToClientDetails(client._id)"
                @mouseenter="hoverId = client._id"
                @mouseleave="hoverId = null"
              >
                <td class="p-2 text-left">
                  {{ client.firstName + ' ' + client.lastName }}
                </td>

                <td class="p-2 text-left">
                  {{ client.address.city }}
                </td>

                <td class="p-2 text-left">
                  {{ client.phoneNumber.primary }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { useToast } from 'vue-toastification'
import { useLoggedInUserStore } from '../store/loggedInUser'

import {
  getEventById,
  getEventAttendees,
  getServices,
  updateEvent,
  deleteEvent
} from '../api/api'

const route = useRoute()
const router = useRouter()
const toast = useToast()
const user = useLoggedInUserStore()

const clients = ref([])
const services = ref([])
const hoverId = ref(null)

const event = reactive({
  _id: null,
  name: '',
  description: '',
  date: '',
  address: {
    line1: '',
    line2: '',
    city: '',
    county: '',
    zip: ''
  },
  attendees: [],
  services: []
})

const validDate = (value) => {
  const date = new Date(value)
  return !isNaN(date)
}

const rules = {
  event: {
    name: {
      required
    },
    date: {
      required,
      validDate
    }
  }
}

const v$ = useVuelidate(rules, { event })

function goToClientDetails(id) {
  router.push({
    name: 'clientdetails',
    params: { id }
  })
}

async function submitEventUpdate() {
  await v$.value.$validate()

  if (v$.value.$error) {
    return
  }

  try {
    const response = await updateEvent(route.params.id, event)

    toast.success(response)
    router.push('/findevents')
  } catch (error) {
    toast.error('Error updating event')
    console.error(error)
  }
}

async function submitDeleteEvent() {
  try {
    if (event.attendees.length !== 0) {
      toast.info('Event can not be deleted since it has attendees.')
      return
    }

    const response = await deleteEvent(route.params.id)

    toast.success(response)
    router.push('/findevents')
  } catch (error) {
    toast.error(error)
  }
}

onMounted(async () => {
  try {
    const [
      eventResponse,
      clientsResponse,
      servicesResponse
    ] = await Promise.all([
      getEventById(route.params.id),
      getEventAttendees(route.params.id),
      getServices()
    ])

    eventResponse.date = new Date(eventResponse.date)
      .toISOString()
      .substring(0, 10)

    Object.assign(event, eventResponse)

    clients.value = clientsResponse
    services.value = servicesResponse
  } catch (error) {
    toast.error('Error loading event data')
    console.error(error)
  }
})
</script>