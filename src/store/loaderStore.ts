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
    //funcion para 'capturar' peticiones y hasta no finalizar no quitar el loader
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
