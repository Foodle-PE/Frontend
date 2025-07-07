<script setup>
import { useI18n } from 'vue-i18n'

defineProps({
  profile: {
    type: Object,
    required: true,
  },
  onEditProfile: {
    type: Function,
    required: true,
  },
  logout: {
    type: Function,
    required: true,
  },
})

const emit = defineEmits(['edit-profile', 'logout'])

const { t } = useI18n()
</script>

<template>
  <div class="custom-card card">
    <div class="profile-header">
      <img
          :src="`https://ui-avatars.com/api/?name=${encodeURIComponent(profile.fullName)}&background=29a847&color=fff&rounded=true&size=90`"
          alt="Foto de perfil"
          class="profile-picture"
      />
      <div class="header-content">
        <h1>{{ t('profile.greeting', { name: profile.fullName }) }}</h1>
        <button class="p-button edit-button" @click="emit('edit-profile')">
          {{ t('profile.edit') }}
        </button>
      </div>
    </div>

    <div class="profile-section">
      <h2>{{ t('profile.userInfo') }}</h2>
      <p><strong>{{ t('profile.email') }}:</strong> {{ profile.email }}</p>
      <p><strong>{{ t('profile.phone') }}:</strong> {{ profile.phone }}</p>
      <p><strong>{{ t('profile.role') }}:</strong> {{ profile.role }}</p>
    </div>

    <div class="profile-actions">
      <button class="p-button" @click="emit('logout')">{{ t('profile.logout') }}</button>
    </div>
  </div>
</template>

<style scoped>
.profile-header {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.profile-picture {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #29a847;
}

.header-content h1 {
  font-size: 1.4rem;
  margin: 0;
  color: darkslategray;
}

.profile-section {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;
}

.profile-section h2 {
  margin-bottom: 0.5rem;
  color: #29a847;
}

.profile-section p {
  margin: 0.25rem 0;
}

.profile-actions {
  margin-top: 2rem;
  display: flex;
  justify-content: flex-end;
}

.edit-button {
  align-self: flex-start;
  margin-top: 0.5rem;
}
</style>