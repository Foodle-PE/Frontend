<script>
import { defineComponent } from "vue";

import AlertList from './alerts/components/alerta-list.component.vue';
import FooterContent from "../public/footer-content.vue";
import SignInView from "../src/authorization/pages/login-content.component.vue";
import HomeView from "./authorization/pages/home.component.vue";
import ToolbarContent from "../public/toolbarcontent.component.vue";
import DashboardContent from "./views/dashboard-content.vue";
import InventoryTable from './inventory/components/inventory.table.component.vue';

export default defineComponent({
  name: 'App',
  components: {
    AlertList,
    FooterContent,
    SignInView,
    HomeView,
    ToolbarContent,
    DashboardContent,
    InventoryTable
  }
});
</script>

<template>
  <div id="app">
    <router-view />
  </div>
  <FooterContent />
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
