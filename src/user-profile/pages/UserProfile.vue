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
    console.log("authStore.userId:", authStore.currentUserId);

    try {
      this.profile = await this.profileService.getProfile(userId);
    } catch (error) {
      console.error('Error al obtener el perfil:', error);
    }
  }
}
</script>

<template>
  <div class="container">
    <UserProfileCard :profile="profile" v-if="profile" />
  </div>
</template>

<style scoped>

</style>