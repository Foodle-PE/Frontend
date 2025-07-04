<script>
export default {
  name: "userProfileCard",
  props: {
    profile: Object
  }
}
</script>

<template>
  <div class="card">
    <h2>Perfil de Usuario</h2>
    <p><strong>Nombre:</strong> {{ profile.firstName }} {{ profile.lastName }}</p>
    <p><strong>Email:</strong> {{ profile.email }}</p>
    <p><strong>Teléfono:</strong> {{ profile.phone }}</p>
  </div>
</template>

<style scoped>

</style>