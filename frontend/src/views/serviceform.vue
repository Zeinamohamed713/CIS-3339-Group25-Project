<!-- This view allows for the creation of a new service -->

<template>
  <main>
    <!-- Header -->
    <h1 class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10">
      Create Service
    </h1>

    <div class="px-10 py-20">
      <form @submit.prevent="handleSubmitForm">
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

              <span v-if="v$.service.name.$error" class="text-red-500">
                Service Name is required
              </span>
            </label>
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
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10 mt-10">
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

        <!-- Add Service -->
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
          <div></div>

          <div class="flex justify-between mt-10 mr-20">
            <button
              class="bg-red-700 text-white rounded"
              type="submit"
            >
              Add Service
            </button>
          </div>
        </div>
      </form>
    </div>
  </main>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { createService } from '../api/api'
import { useToast } from 'vue-toastification'

const router = useRouter()
const toast = useToast()

const service = reactive({
  name: '',
  description: '',
  status: 'Active'
})

const rules = {
  service: {
    name: {
      required
    }
  }
}

const v$ = useVuelidate(rules, { service })

async function handleSubmitForm() {
  await v$.value.$validate()

  if (v$.value.$error) {
    return
  }

  try {
    const response = await createService(service)

    toast.success(response)
    router.push('/findservice')
  } catch (error) {
    toast.error('Error creating new service')
    console.error(error)
  }
}
</script>