<script>

import {defineComponent} from "vue";
import FooterContent from "../public/footer-content.vue";
import SignInView from "../src/authorization/pages/login-content.component.vue";
import HomeView from "./authorization/pages/home.component.vue";
import toolbarcontentComponent from "../public/toolbarcontent.component.vue";


export default defineComponent({
  components: {toolbarcontentComponent, HomeView, FooterContent, SignInView},
})
</script>

<template>
<toolbarcontent-component/>
  <router-view />
</template>

<style scoped>

</style>
