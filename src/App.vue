<template>
<div class="min-h-screen flex flex-col">
  <header class="bg-blue-600 text-white p-4">PRUEBA DE HEADER USANDO Tailwind </header>
  <main class="flex-1 p-4 bg-gray-50">
    <router-view></router-view>
  </main>
  <footer class="bg-gray-200 p-4 text-center">Footer</footer>
</div>

</template>

<script lang="ts">
export default {
  name: 'App',
}
</script>

<style>

</style>
