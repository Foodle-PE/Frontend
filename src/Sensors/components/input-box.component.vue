<template>
  <div class="input-box">
    <input v-model="name" placeholder="Nombre del gráfico..." />
    <button @click="emitCreate">Crear</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: ''
    }
  },
  methods: {
    emitCreate() {
      if (this.name.trim()) {
        this.$emit('create-graph', this.name.trim())
        this.name = ''
      }
    }
  }
}
</script>

<style scoped>
.input-box {
  display: flex;
  gap: 1rem;
}
input {
  flex: 1;
  padding: 0.5rem;
}
button {
  background-color: orange;
  border: none;
  padding: 0.5rem 1rem;
  font-weight: bold;
  cursor: pointer;
}
</style>
