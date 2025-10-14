import { defineStore } from 'pinia'

export const useLoaderStore = defineStore('loaderStore', {

  state: () => ({
    loading: false
  }),
  actions: {
    startLoading() {
      this.loading = true
    },
    stopLoading() {
      this.loading = false
    },
    async loadWithSpinner<T>(call: Promise<T>): Promise<T> {
      this.startLoading()
      try {
        return await call
      } finally {
        this.stopLoading()
      }
    }
  }
})
