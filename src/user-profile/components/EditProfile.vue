<script>
import { ProfileService } from '../services/profile.service.js';
import { useAuthenticationStore } from '/src/authorization/services/authentication.store.js';

export default {
  name: 'EditProfile',
  data() {
    return {
      form: {
        firstName: '',
        lastName: '',
        email: '',
        phone: ''
      },
      profileService: new ProfileService()
    };
  },
  async created() {
    const userId = useAuthenticationStore().currentUserId;
    try {
      const profile = await this.profileService.getProfile(userId);
      const [first, ...rest] = profile.fullName.split(' ');
      this.form.firstName = first;
      this.form.lastName = rest.join(' ');
      this.form.email = profile.email;
      this.form.phone = profile.phone;
    } catch (error) {
      console.error('Error cargando perfil para edición:', error);
    }
  },
  methods: {
    async updateProfile() {
      const userId = useAuthenticationStore().currentUserId;
      try {
        await this.profileService.updateProfile(userId, this.form);
        this.$router.push({ name: 'user-profile' });
      } catch (error) {
        console.error('Error al actualizar el perfil:', error);
      }
    },
    goBack() {
      this.$router.push({ name: 'user-profile' });
    }
  }
};
</script>

<template>
  <div class="edit-profile-container">
    <div class="custom-card">
      <h2>Editar Perfil</h2>

      <div class="form-group">
        <label for="firstName">Nombre</label>
        <input id="firstName" v-model="form.firstName" class="p-inputtext" type="text" placeholder="Ej. Harry" />
      </div>

      <div class="form-group">
        <label for="lastName">Apellido</label>
        <input id="lastName" v-model="form.lastName" class="p-inputtext" type="text" placeholder="Ej. Potter" />
      </div>

      <div class="form-group">
        <label for="email">Correo electrónico</label>
        <input
            id="email"
            v-model="form.email"
            class="p-inputtext"
            type="email"
            placeholder="Ej. maria@gmail.com"
        />
      </div>

      <div class="form-group">
        <label for="phone">Teléfono</label>
        <input
            id="phone"
            v-model="form.phone"
            class="p-inputtext"
            type="text"
            placeholder="Ej. 999999999"
        />
      </div>

      <div class="button-group">
        <button class="p-button" @click="updateProfile">Guardar cambios</button>
        <button class="p-button logout-button" @click="goBack">Cancelar</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.edit-profile-container {
  display: flex;
  justify-content: center;
  padding: 2rem;
}

.custom-card h2 {
  margin-bottom: 1.5rem;
  color: #29a847;
  font-size: 1.8rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  margin-bottom: 1.5rem;
}

.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;
}

.logout-button {
  background-color: #6c757d !important;
}
</style>