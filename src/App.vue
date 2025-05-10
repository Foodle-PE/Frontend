<script>

import {defineComponent} from "vue";
import FooterContent from "../public/footer-content.vue";

export default defineComponent({
  components: {FooterContent}
})
</script>

<template>
  <p>FUNCIONA</p>
  <FooterContent></FooterContent>
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
