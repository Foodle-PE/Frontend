<template>
  <pv-toolbar class="toolbar">
    <template #start>
      <img src="../src/assets/logo_GoodFood.png" alt="GoodFood Logo" style="width: 100px; height: 92px;" />
    </template>

    <template #center>
      <div class="nav-buttons">
        <router-link to="/home" class="nav-button">Home</router-link>
        <router-link to="/inventory" class="nav-button">Inventario</router-link>
        <router-link to="/alerts" class="nav-button">Alertas</router-link>
      </div>
    </template>

    <template #end>
      <button class="logout-button" @click="logout">Cerrar sesión</button>
    </template>
  </pv-toolbar>
</template>

<script>
export default {
  name: "ToolbarContent",
  methods: {
    logout() {
      localStorage.removeItem('token')
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
.toolbar {
  display: flex;
  justify-content: space-between;
  background-color: #28A745;
  height: 90px;
  align-items: center;
  padding: 0 1rem;
}

.nav-buttons {
  display: flex;
  gap: 1rem;
}

.nav-button {
  color: white;
  text-decoration: none;
  font-weight: bold;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.15);
  transition: background-color 0.3s;
}

.nav-button:hover {
  background-color: rgba(255, 255, 255, 0.3);
}

.logout-button {
  background-color: #DC3545;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.logout-button:hover {
  background-color: #c82333;
}
</style>
