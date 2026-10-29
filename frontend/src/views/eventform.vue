<!-- This view allows for the creation of a new event -->

<template>
  <main>
    <div>
      <!-- Header -->
      <h1 class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10">
        Create New Event
      </h1>
    </div>

    <div class="px-10 py-20">
      <form @submit.prevent="handleSubmitForm">
        <!-- Event Details -->
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
            </label>

            <span v-if="v$.event.name.$error" class="text-red-500">
              Event Name is required
            </span>
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
            </label>

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

              <span
                v-else-if="
                  !v$.event.date.required.$invalid &&
                  !v$.event.date.validDate.$invalid &&
                  v$.event.date.notBeforeToday.$invalid
                "
              >
                New Event Date cannot be in the past.
              </span>
            </span>
          </div>

          <div></div>
          <div></div>

          <!-- Description -->
          <div class="flex col-span-2 flex-col">
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

        <!-- Services Offered -->
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10 mt-10">
          <h2 class="text-2xl font-bold">Services Offered at Event</h2>

          <div class="flex flex-col grid-cols-3">
            <div>
              <ul v-if="activeServices.length" class="space-y-2">
                <li
                  v-for="service in activeServices"
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
                      class="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50 mr-2"
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

        <!-- Submit -->
        <div class="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
          <div></div>

          <div class="flex justify-between mr-20">
            <button
              class="bg-red-700 text-white rounded"
              type="submit"
            >
              Add New Event
            </button>
          </div>
        </div>
      </form>
    </div>
  </main>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { getServices, createEvent } from '../api/api'
import { useToast } from 'vue-toastification'

const router = useRouter()
const toast = useToast()

const event = reactive({
  name: '',
  description: '',
  date: '',
  services: [],
  address: {
    line1: '',
    line2: '',
    city: '',
    county: '',
    zip: ''
  },
  attendees: []
})

const activeServices = ref([])

const validDate = (value) => {
  const date = new Date(value)
  return !isNaN(date)
}

const notBeforeToday = (value) => {
  const today = new Date()
  return value >= today.toISOString().split('T')[0]
}

const rules = {
  event: {
    name: {
      required
    },
    date: {
      required,
      validDate,
      notBeforeToday
    }
  }
}

const v$ = useVuelidate(rules, { event })

async function handleSubmitForm() {
  await v$.value.$validate()

  if (v$.value.$error) {
    toast.error('Please fix input field errors')
    return
  }

  try {
    const response = await createEvent(event)

    toast.success(response)
    router.push('/findevents')
  } catch (error) {
    toast.error('Error creating new event')
    console.error(error)
  }
}

onMounted(async () => {
  try {
    const response = await getServices()

    activeServices.value = response.filter(
      (item) => item.status === 'Active'
    )
  } catch (error) {
    toast.error(error)
  }
})
</script>