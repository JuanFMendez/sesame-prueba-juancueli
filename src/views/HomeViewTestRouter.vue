<template>
  <div class="p-6">

    <!-- COMPROBACION DE QUE TENEMOS PINIA INSTALADO OK Y LIBRERIA CSS-->
    <h1 class="text-3xl font-bold mb-6">Vacantes</h1>
    <div v-for="vac in store.vacancies" :key="vac.id" class="mb-6 p-4 border rounded-lg shadow-md">
      
        <h2 class="text-xl font-semibold">{{ vac.name }}</h2>

        <p class="text-gray-700">{{ vac.description }}</p>
        <h3 class="mt-3 font-medium">Candidatos:</h3>

        <ul class="list-disc list-inside mt-1">
            <li v-for="cand in store.candidatesByVacancy(vac.id)" :key="cand.email" class="text-gray-800">
                {{ cand.firstName }} {{ cand.lastName }} - {{ cand.email }}
            </li>
        </ul>

    </div>

  </div>
</template>

<script lang="ts">

    import { defineComponent, onMounted } from 'vue'
    import { useMockStore } from '../store/mockStore'

    export default defineComponent({
        name: 'HomeViewTestRouter',
        setup() {

            const store = useMockStore()

            // cargamos mocks para comprobar que podemos recuperar desde store
            onMounted(() => {
                store.loadMocks()
            })

            return { store }
        }
    })

</script>
