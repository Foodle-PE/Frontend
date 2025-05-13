<template>
  <div class="p-8">
    <h1 class="text-2xl font-bold text-green-700">Bienvenido a la página principal</h1>
    <p class="mt-4 text-gray-700">Has iniciado sesión correctamente.</p>
    <div>
      <button @click="logout">Cerrar sesión</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  methods: {
    logout() {
      const authStore = useAuthenticationStore();
      authStore.signOut(this.$router);
    }
  }
}

import { useAuthenticationStore } from '/src/authorization/services/authentication.store.js';
</script>

<style scoped>

</style>
