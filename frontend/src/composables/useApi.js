import { ref } from 'vue'

export function useApi(defaultApiCall = null) {
  const data = ref(null)
  const loading = ref(false)
  const error = ref(null)

  async function execute(apiCallOrArg, ...args) {
    loading.value = true
    error.value = null

    try {
      let apiCall = defaultApiCall
      let callArgs = []

      if (typeof apiCallOrArg === 'function') {
        apiCall = apiCallOrArg
        callArgs = args
      } else {
        callArgs = [apiCallOrArg, ...args]
      }

      if (!apiCall) {
        throw new Error('No API call provided')
      }

      data.value = await apiCall(...callArgs)

      return data.value
    } catch (err) {
      error.value = err.message || 'Something went wrong'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function retry(apiCallOrArg, ...args) {
    return execute(apiCallOrArg, ...args)
  }

  return {
    data,
    loading,
    error,
    execute,
    retry
  }
}