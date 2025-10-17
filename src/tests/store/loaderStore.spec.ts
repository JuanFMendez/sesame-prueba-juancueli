import { setActivePinia, createPinia } from 'pinia'
import { describe, it, expect, beforeEach } from 'vitest'

import { useLoaderStore } from '../../store/loaderStore'

describe('Loader Store', () => {
  let store: ReturnType<typeof useLoaderStore>

  beforeEach(() => {
    setActivePinia(createPinia())
    store = useLoaderStore()
  })

  // Test 1: El store inicia con loading en false
  it('inicia con loading en false', () => {
    expect(store.loading).toBe(false)
  })

  // Test 2: startLoading activa loading
  it('startLoading activa loading', () => {
    store.startLoading()
    expect(store.loading).toBe(true)
  })

  // Test 3: stopLoading desactiva loading
  it('stopLoading desactiva loading', () => {
    store.loading = true
    store.stopLoading()
    expect(store.loading).toBe(false)
  })

  // Test 4: loadWithSpinner activa y desactiva loading al resolver la promesa
  it('loadWithSpinner activa y desactiva loading al resolver la promesa', async () => {
    const promise = new Promise<string>(resolve => setTimeout(() => resolve('ok'), 50))

    const resultPromise = store.loadWithSpinner(promise)

    // Mientras la promesa no se resuelve, loading debe ser true
    expect(store.loading).toBe(true)

    const result = await resultPromise

    expect(result).toBe('ok')
    expect(store.loading).toBe(false)
  })

 
})
