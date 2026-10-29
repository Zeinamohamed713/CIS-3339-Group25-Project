<!-- This view allows a user to update a specific service's information. -->

<template>
  <main>
    <!-- Header -->
    <h1 class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10">
      Service Details
    </h1>

    <div class="px-10 py-20">
      <!-- Service Details -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
        <h2 class="text-2xl font-bold">Service Details</h2>

        <!-- Service Name -->
        <div class="flex flex-col">
          <label class="block">
            <span class="text-gray-700">Service Name</span>
            <span style="color: #ff0000">*</span>

            <input
              v-model="service.name"
              type="text"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </label>

          <span v-if="v$.service.name.$error" class="text-red-500">
            Service Name is required
          </span>
        </div>

        <!-- Description -->
        <div class="flex flex-col">
          <label>
            <span class="text-gray-700">Description:</span>

            <textarea
              v-model="service.description"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            ></textarea>
          </label>
        </div>
      </div>

      <!-- Service Status -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
        <div></div>

        <div class="flex flex-col">
          <label class="block">
            <span class="text-gray-700">Service Status</span>
            <span style="color: #ff0000">*</span>

            <div class="mt-1">
              <label class="inline-flex items-center">
                <input
                  v-model="service.status"
                  type="radio"
                  class="form-radio"
                  value="Active"
                />
                <span class="ml-2">Active</span>
              </label>

              <label class="inline-flex items-center ml-6">
                <input
                  v-model="service.status"
                  type="radio"
                  class="form-radio"
                  value="Inactive"
                />
                <span class="ml-2">Inactive</span>
              </label>
            </div>
          </label>
        </div>
      </div>

      <!-- Buttons -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
        <div></div>

        <div class="flex justify-between mt-10 mr-20">
          <div class="flex justify-between mt-10 mr-25">
            <button
              type="button"
              class="bg-green-700 disabled:opacity-50 text-white rounded"
              :disabled="user.role === 'viewer'"
              @click="submitServiceUpdate"
            >
              Update Service
            </button>
          </div>
        </div>

        <div class="flex justify-between mt-20 mr-20">
          <button
            type="button"
            class="bg-red-700 disabled:opacity-50 text-white rounded"
            :disabled="user.role === 'viewer'"
            @click="submitDeleteService"
          >
            Delete Service
          </button>
        </div>

        <div class="flex justify-between mt-20 mr-20">
          <button
            type="button"
            class="border border-red-700 bg-white text-red-700 rounded"
            @click="router.back()"
          >
            Go back
          </button>
        </div>
      </div>
    </div>

    <hr class="mt-10 mb-10" />

    <!-- Events using this service -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
      <div class="ml-10">
        <h2 class="text-2xl font-bold">List of Events</h2>
        <h3 class="italic">Click table row to view event details</h3>
      </div>

      <div class="flex flex-col col-span-2">
        <table class="min-w-full shadow-md rounded">
          <thead class="bg-gray-50 text-xl">
            <tr>
              <th class="p-4 text-left">Event Name</th>
              <th class="p-4 text-left">Event Date</th>
              <th class="p-4 text-left">Event Address</th>
            </tr>
          </thead>

          <tbody class="divide-y divide-gray-300">
            <tr
              v-for="event in events"
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

              <td class="p-2 text-left">
                {{ event.address.line1 }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </main>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { useLoggedInUserStore } from '../store/loggedInUser'
import { useToast } from 'vue-toastification'

import {
  getServiceById,
  getEventsByServiceId,
  updateService,
  deleteService
} from '../api/api'

const route = useRoute()
const router = useRouter()
const toast = useToast()
const user = useLoggedInUserStore()

const events = ref([])
const hoverId = ref(null)

const service = reactive({
  _id: null,
  name: '',
  description: '',
  status: ''
})

const rules = {
  service: {
    name: {
      required
    }
  }
}

const v$ = useVuelidate(rules, { service })

function formatDate(date) {
  const isoDate = new Date(date)

  const year = isoDate.getUTCFullYear()
  const month = String(isoDate.getUTCMonth() + 1).padStart(2, '0')
  const day = String(isoDate.getUTCDate()).padStart(2, '0')

  return `${month}/${day}/${year}`
}

function goToEventDetails(id) {
  router.push({
    name: 'eventdetails',
    params: { id }
  })
}

async function submitServiceUpdate() {
  await v$.value.$validate()

  if (v$.value.$error) {
    return
  }

  try {
    const response = await updateService(route.params.id, service)

    toast.success(response)
    router.push('/findservice')
  } catch (error) {
    toast.error('Error updating service')
    console.error(error)
  }
}

async function submitDeleteService() {
  try {
    if (events.value.length !== 0) {
      toast.info(
        'Service can not be deleted since it is being used by events.'
      )
      return
    }

    const response = await deleteService(route.params.id)

    toast.success(response)
    router.push('/findservice')
  } catch (error) {
    toast.error(error)
  }
}

onMounted(async () => {
  try {
    const [serviceResponse, eventsResponse] = await Promise.all([
      getServiceById(route.params.id),
      getEventsByServiceId(route.params.id)
    ])

    Object.assign(service, serviceResponse)
    events.value = eventsResponse
  } catch (error) {
    toast.error('Error loading service data')
    console.error(error)
  }
})
</script>