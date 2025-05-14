<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "toolbarcontent.component",
})
</script>

<template>
  <pv-toolbar class="toolbar">
    <template #start>
      <img src="../src/assets/logo_GoodFood.png" alt="GoodFood Logo" style="width: 100px; height: 92px;"/>
    </template>

  </pv-toolbar>

</template>

<style scoped>
.toolbar {
  display: flex;
  justify-content: center;
  background-color: #28A745;
  height: 90px;
  flex-wrap: nowrap;
}

</style>