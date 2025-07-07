<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { ProfileService } from '../services/profile.service.js'
import { useAuthenticationStore } from '/src/authorization/services/authentication.store.js'

const { t } = useI18n()
const router = useRouter()

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: ''
})

const profileService = new ProfileService()

onMounted(async () => {
  const userId = useAuthenticationStore().currentUserId
  try {
    const profile = await profileService.getProfile(userId)
    const [first, ...rest] = profile.fullName.split(' ')
    form.value.firstName = first
    form.value.lastName = rest.join(' ')
    form.value.email = profile.email
    form.value.phone = profile.phone
  } catch (error) {
    console.error('Error cargando perfil para edición:', error)
  }
})

const updateProfile = async () => {
  const userId = useAuthenticationStore().currentUserId
  try {
    await profileService.updateProfile(userId, form.value)
    router.push({ name: 'user-profile' })
  } catch (error) {
    console.error('Error al actualizar el perfil:', error)
  }
}

const goBack = () => {
  router.push({ name: 'user-profile' })
}
</script>

<template>
  <div class="edit-profile-container">
    <div class="custom-card">
      <h2>{{ t('editProfile.title') }}</h2>

      <div class="form-group">
        <label for="firstName">{{ t('editProfile.firstName') }}</label>
        <input id="firstName" v-model="form.firstName" class="p-inputtext" type="text" :placeholder="t('editProfile.firstNamePlaceholder')" />
      </div>

      <div class="form-group">
        <label for="lastName">{{ t('editProfile.lastName') }}</label>
        <input id="lastName" v-model="form.lastName" class="p-inputtext" type="text" :placeholder="t('editProfile.lastNamePlaceholder')" />
      </div>

      <div class="form-group">
        <label for="email">{{ t('editProfile.email') }}</label>
        <input id="email" v-model="form.email" class="p-inputtext" type="email" :placeholder="t('editProfile.emailPlaceholder')" />
      </div>

      <div class="form-group">
        <label for="phone">{{ t('editProfile.phone') }}</label>
        <input id="phone" v-model="form.phone" class="p-inputtext" type="text" :placeholder="t('editProfile.phonePlaceholder')" />
      </div>

      <div class="button-group">
        <button class="p-button" @click="updateProfile">{{ t('editProfile.save') }}</button>
        <button class="p-button logout-button" @click="goBack">{{ t('editProfile.cancel') }}</button>
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