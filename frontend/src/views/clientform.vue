<!-- This view allows a user to create client information. -->

<template>
  <main>
    <!-- Header -->
    <h1 class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10">
      Client Intake Form
    </h1>

    <div class="px-10 py-20">
      <form @submit.prevent="submitForm">
        <!-- Personal Details -->
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
          <h2 class="text-2xl font-bold">Personal Details</h2>

          <!-- First Name -->
          <div class="flex flex-col">
            <label class="block">
              <span class="text-gray-700">First Name</span>
              <span style="color: #ff0000">*</span>

              <input
                v-model="client.firstName"
                type="text"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </label>

            <span v-if="v$.client.firstName.$error" class="text-red-500">
              First Name is required
            </span>
          </div>

          <!-- Middle Name -->
          <div class="flex flex-col">
            <label class="block">
              <span class="text-gray-700">Middle Name</span>

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
              <span class="text-gray-700">Last Name</span>
              <span style="color: #ff0000">*</span>

              <input
                v-model="client.lastName"
                type="text"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </label>

            <span v-if="v$.client.lastName.$error" class="text-red-500">
              Last Name is required
            </span>
          </div>

          <div></div>

          <!-- Email -->
          <div class="flex flex-col">
            <label class="block">
              <span class="text-gray-700">Email</span>
              <span style="color: #ff0000">*</span>

              <input
                v-model="client.email"
                type="email"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </label>

            <span v-if="v$.client.email.$error" class="text-red-500">
              Valid Email is required
            </span>
          </div>

          <!-- Phone Number -->
          <div class="flex flex-col">
            <label class="block">
              <span class="text-gray-700">Phone Number</span>
              <span style="color: #ff0000">*</span>

              <input
                v-model="client.phoneNumber.primary"
                type="text"
                pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </label>

            <span
              v-if="v$.client.phoneNumber.primary.$error"
              class="text-red-500"
            >
              <span v-if="v$.client.phoneNumber.primary.required.$invalid">
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
                  (v$.client.phoneNumber.primary.minLength.$invalid ||
                    v$.client.phoneNumber.primary.maxLength.$invalid)
                "
              >
                Phone Number must be exactly 10 digits
              </span>
            </span>
          </div>

          <!-- Alternate Phone -->
          <div class="flex flex-col">
            <label class="block">
              <span class="text-gray-700">Alternative Phone Number</span>

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
        <div class="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
          <h2 class="text-2xl font-bold">Address Details</h2>

          <!-- Address Line 1 -->
          <div class="flex flex-col">
            <label class="block">
              <span class="text-gray-700">Address Line 1</span>

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
              <span class="text-gray-700">Address Line 2</span>

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
              <span class="text-gray-700">City</span>
              <span style="color: #ff0000">*</span>

              <input
                v-model="client.address.city"
                type="text"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </label>

            <span v-if="v$.client.address.city.$error" class="text-red-500">
              City is required
            </span>
          </div>

          <div></div>

          <!-- County -->
          <div class="flex flex-col">
            <label class="block">
              <span class="text-gray-700">County</span>

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
              <span class="text-gray-700">Zip Code</span>

              <input
                v-model="client.address.zip"
                type="text"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </label>
          </div>

          <div></div>

          <!-- Add Client -->
          <div class="flex justify-between mt-10 mr-20">
            <button
              class="bg-red-700 text-white rounded"
              type="submit"
            >
              Add Client
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
import {
  required,
  email,
  numeric,
  minLength,
  maxLength
} from '@vuelidate/validators'
import { createClient } from '../api/api'
import { useToast } from 'vue-toastification'

const router = useRouter()
const toast = useToast()

const client = reactive({
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

async function submitForm() {
  await v$.value.$validate()

  if (v$.value.$error) {
    return
  }

  try {
    const response = await createClient(client)

    toast.success(response)
    router.push('/findclient')
  } catch (error) {
    toast.error(error)
  }
}
</script>