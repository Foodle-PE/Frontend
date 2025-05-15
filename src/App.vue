<script>
import {defineComponent} from "vue";
import FooterContent from "../public/footer-content.vue";
import SignInView from "../src/authorization/pages/login-content.component.vue";
import HomeView from "./authorization/pages/home.component.vue";
import toolbarcontentComponent from "../public/toolbarcontent.component.vue";


import FooterContent from "/public/footer-content.vue";
import InventoryTable from './inventory/components/inventory.table.component.vue';
export default defineComponent({
  components: {FooterContent, InventoryTable}
  components: {toolbarcontentComponent, HomeView, FooterContent, SignInView},
})
</script>

<template>
  <InventoryTable></InventoryTable>
  <FooterContent></FooterContent>
<toolbarcontent-component/>
  <router-view />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
