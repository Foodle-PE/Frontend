<script>
import AlertList from './alerts/components/alerta-list.component.vue';

export default {
  name: 'App',
  components: {
    AlertList
  }
}
import {defineComponent} from "vue";
import FooterContent from "../public/footer-content.vue";
import SignInView from "../src/authorization/pages/login-content.component.vue";
import HomeView from "./authorization/pages/home.component.vue";
import toolbarcontentComponent from "../public/toolbarcontent.component.vue";
import DashboardContent from "./views/dashboard-content.vue";


import FooterContent from "/public/footer-content.vue";
import InventoryTable from './inventory/components/inventory.table.component.vue';
export default defineComponent({
  components: {FooterContent, DashboardContent: DashboardContent},
  components: {FooterContent, InventoryTable}
  components: {toolbarcontentComponent, HomeView, FooterContent, SignInView},
})
</script>

<template>
  <div id="app">
    <h1>Gestión de Inventario</h1>
    <AlertList />
  </div>
<DashboardContent></DashboardContent>
  <InventoryTable></InventoryTable>
  <FooterContent></FooterContent>
<toolbarcontent-component/>
  <router-view />
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
