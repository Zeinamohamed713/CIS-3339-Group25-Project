<template>
  <div>
    <!-- Empty state -->
    <div
      v-if="rows.length === 0"
      class="text-center text-gray-500 p-6"
    >
      No results found.
    </div>

    <template v-else>
      <table class="min-w-full shadow-md rounded">
        <thead class="bg-gray-50 text-xl">
          <tr>
            <th
              v-for="column in columns"
              :key="column.key"
              class="p-4 text-left select-none"
              :class="column.sortable !== false ? 'cursor-pointer hover:bg-gray-100' : ''"
              @click="changeSort(column)"
            >
              <span class="inline-flex items-center">
                {{ column.label }}

                <!-- Unsorted -->
                <span
                  v-if="
                    column.sortable !== false &&
                    sortKey !== column.key
                  "
                  class="ml-2 text-gray-400 text-sm"
                >
                  ⇅
                </span>

                <!-- Ascending -->
                <span
                  v-else-if="
                    sortKey === column.key &&
                    sortDirection === 'asc'
                  "
                  class="ml-2 text-sm"
                >
                  ▲
                </span>

                <!-- Descending -->
                <span
                  v-else-if="
                    sortKey === column.key &&
                    sortDirection === 'desc'
                  "
                  class="ml-2 text-sm"
                >
                  ▼
                </span>
              </span>
            </th>
          </tr>
        </thead>

        <tbody class="divide-y divide-gray-300">
          <tr
            v-for="row in paginatedRows"
            :key="row._id"
            class="cursor-pointer hover:bg-gray-50"
            @click="$emit('row-click', row)"
          >
            <td
              v-for="column in columns"
              :key="column.key"
              class="p-4 text-left"
            >
              {{ getValue(row, column.key) }}
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Pagination -->
      <div class="flex justify-between items-center mt-4">
        <button
          type="button"
          class="border border-red-700 bg-white text-red-700 rounded disabled:opacity-50"
          :disabled="currentPage === 1"
          @click="previousPage"
        >
          Previous
        </button>

        <span class="text-gray-700">
          Page {{ currentPage }} of {{ totalPages }}
        </span>

        <button
          type="button"
          class="border border-red-700 bg-white text-red-700 rounded disabled:opacity-50"
          :disabled="currentPage === totalPages"
          @click="nextPage"
        >
          Next
        </button>
      </div>
    </template>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'

const props = defineProps({
  columns: {
    type: Array,
    required: true
  },

  rows: {
    type: Array,
    required: true
  }
})

defineEmits(['row-click'])

const rowsPerPage = 10
const currentPage = ref(1)

const sortKey = ref('')
const sortDirection = ref('')

function getValue(row, key) {
  return key
    .split('.')
    .reduce((value, part) => value?.[part], row)
}

const sortedRows = computed(() => {
  if (!sortKey.value || !sortDirection.value) {
    return [...props.rows]
  }

  return [...props.rows].sort((a, b) => {
    const aValue = getValue(a, sortKey.value)
    const bValue = getValue(b, sortKey.value)

    if (aValue == null && bValue == null) {
      return 0
    }

    if (aValue == null) {
      return 1
    }

    if (bValue == null) {
      return -1
    }

    const first = String(aValue).toLowerCase()
    const second = String(bValue).toLowerCase()

    if (first < second) {
      return sortDirection.value === 'asc' ? -1 : 1
    }

    if (first > second) {
      return sortDirection.value === 'asc' ? 1 : -1
    }

    return 0
  })
})

const totalPages = computed(() => {
  return Math.max(
    1,
    Math.ceil(sortedRows.value.length / rowsPerPage)
  )
})

const paginatedRows = computed(() => {
  const start = (currentPage.value - 1) * rowsPerPage
  const end = start + rowsPerPage

  return sortedRows.value.slice(start, end)
})

function changeSort(column) {
  if (column.sortable === false) {
    return
  }

  if (sortKey.value !== column.key) {
    sortKey.value = column.key
    sortDirection.value = 'asc'
  } else if (sortDirection.value === 'asc') {
    sortDirection.value = 'desc'
  } else if (sortDirection.value === 'desc') {
    sortKey.value = ''
    sortDirection.value = ''
  } else {
    sortKey.value = column.key
    sortDirection.value = 'asc'
  }

  currentPage.value = 1
}

function previousPage() {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

watch(
  () => props.rows,
  () => {
    currentPage.value = 1
  },
  { deep: true }
)
</script>