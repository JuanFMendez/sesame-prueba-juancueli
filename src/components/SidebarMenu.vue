<template>
  <aside class="w-80 bg-white text-gray-800 h-screen p-6">

    <!-- Logo -->
    <div class="flex justify-center mb-6 p-6">
      <img :src="logo" alt="Sesame" class="w-48 h-auto object-contain"/>
    </div>

    <!-- Contenedor principal -->
    <div class="mb-3 text-sm">

      <!-- nivel 1  -->
      <div v-for="(nivel1, i) in menu" :key="i" class="space-y-1">

        <div class="flex justify-between items-center cursor-pointer mb-1 text-gray-600 select-none text-base"
          @click="nivel1.open = !nivel1.open"
        >
          <!-- titulo nivel 1 (i18n) -->
          <span>{{ t(nivel1.title) }}</span>
          <ChevronDown :class="{'rotate-180': nivel1.open}" class="w-4 h-4 transition-transform duration-200" />
        </div>

        <!-- nivel 2 -->
        <div v-if="nivel1.open" class="ml-3 p-4 bg-submenu rounded space-y-1">

          <div v-for="(nivel2, j) in nivel1.children" :key="j">
            
            <div class="flex justify-between items-center cursor-pointer text-lila font-normal select-none text-base"
              @click="nivel2.open = !nivel2.open"
            >
              <!-- titulo nivel 2 (i18n) -->
              <div class="flex items-center">
                <component :is="nivel2.icon" class="w-4 h-4 mr-2" />
                <span>{{ t(nivel2.title) }}</span>
              </div>
              <ChevronDown :class="{'rotate-180': nivel2.open}" class="w-4 h-4 transition-transform duration-200" />
            </div>

            <!-- nivel 3 -->
            <div v-if="nivel2.open" v-for="(nivel3, k) in nivel2.children" :key="k"
              class="cursor-pointer font-bold py-2 pl-4 text-lila select-none text-base"
              :class="nivel3.active ? 'border-l-2 border-lila ml-1' : ''"
              @click="selectItem(nivel3)"
            >
              <!-- opciones nivel 3 (i18n) -->
              <span :class="nivel3.active ? 'font-bold' : 'font-normal'">{{ t(nivel3.title) }}</span>
            </div>

          </div>
        </div>

      </div>
    </div>
  </aside>
</template>

<script lang="ts">
import { ref } from 'vue'
import { ChevronDown, Star } from 'lucide-vue-next'
import logo from '../assets/logo-sesame.png'
import type { MenuItem } from '../domain/entities/MenuItem'
import { useI18n } from 'vue-i18n'

export default {
  name: 'SidebarMenu',
  components: { ChevronDown, Star },
  emits: ['selectItem'],
  setup(props, { emit }) {

    const { t } = useI18n()

    // generamos menu dinamico
    const menu = ref([
      {
        title: 'sidebar.admin', // nivel 1 (i18n)
        open: true,
        children: [
          {
            title: 'sidebar.talent', // nivel 2 (i18n)
            icon: Star,
            open: true,
            children: [
               { title: 'sidebar.recruitment', active: true } // nivel 3 (i18n)             
            ]
          }
        ]
      }
    ])

    // recursividad para resetear active a false de todos los items
    const resetActiveToFalse = (items: MenuItem[]) => {
      items.forEach(item => {
        item.active = false
        if (item.children) {
          resetActiveToFalse(item.children)
        }
      })
    }

    // seleccionamos item y devolvemos el titulo seleccionado
    const selectItem = (nivel3: MenuItem) => {

      // antes de marcar como activo desmarcamos todos los demas
      resetActiveToFalse(menu.value)
      
      nivel3.active = true
      console.debug('elemento nivel 3 seleccionado:', nivel3.title)
      emit('selectItem', nivel3.title)

    }

    return { logo, menu, selectItem, t }
  }
}
</script>
