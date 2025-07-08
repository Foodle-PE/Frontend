<script>
import { ProfileService } from '../services/profile.service.js';
import { useAuthenticationStore } from '/src/authorization/services/authentication.store.js';
import UserProfileCard from '../components/userProfileCard.vue';

export default {
  name: 'UserProfile',
  components: { UserProfileCard },
  data() {
    return {
      profile: null,
      profileService: new ProfileService()
    };
  },
  async created() {
    const authStore = useAuthenticationStore();
    const userId = authStore.currentUserId;
    console.log("User ID obtenido del store:", userId);

    try {
      this.profile = await this.profileService.getProfile(userId);
      console.log('Perfil obtenido:', this.profile);
    } catch (error) {
      console.error('Error al obtener el perfil:', error);
    }
  },
  methods: {
    goToEditProfile() {
      this.$router.push({ name: 'edit-profile' });
    },
    logout() {
      const authStore = useAuthenticationStore();
      authStore.signOut(this.$router);
    }
  }
};
</script>

<template>
  <div class="user-profile-view">
    <userProfileCard
        v-if="profile"
        :profile="profile"
        :onEditProfile="goToEditProfile"
        :logout="logout"
    />
    <div v-else class="loading"> Bienvenido a GoodFood. Gracias por registrarte.</div>
  </div>
</template>

<style scoped>
.user-profile-view {
  padding: 2rem;
  display: flex;
  justify-content: center;
}

.loading {
  font-size: 1.2rem;
  color: #666;
}
</style>