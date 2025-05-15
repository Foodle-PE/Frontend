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
  <div class="app-layout">
    <ToolbarContent />
    <main class="main-content">
      <router-view />
    </main>
    <FooterContent />
  </div>
</template>

<style>
html, body {
  height: 100%;
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
}

.app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  padding: 110px 20px 20px; /* top padding para dejar espacio al Toolbar (90px + extra margen) */
  box-sizing: border-box;
}
</style>
