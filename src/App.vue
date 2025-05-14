<script>
import AlertList from './alerts/components/alerta-list.component.vue';

export default {
  name: 'App',
  components: {
    AlertList
  }
}
</script>

<template>
  <div id="app">
    <h1>Gestión de Inventario</h1>
    <AlertList />
  </div>
</template>

<style>
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
}
#app {
  padding: 20px;
}
</style>
