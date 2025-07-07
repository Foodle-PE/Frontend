<script setup>
import { useAuthenticationStore } from '/src/authorization/services/authentication.store.js'
import { SignInRequest } from '../model/login.request.js'
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const username = ref('')
const password = ref('')
const authStore = useAuthenticationStore()

const errorMessage = computed(() => authStore.errorMessage)

const onSignIn = () => {
  if (!username.value || !password.value) {
    alert(t('auth.missingCredentials'))
    return
  }

  const signInRequest = new SignInRequest(username.value, password.value)
  authStore.signIn(signInRequest, router)
}
</script>

<template>
  <div class="flex justify-content-center align-items-center" style="height: 100vh; background-color: #f9f9f9">
    <div class="surface-card p-4 w-full lg:w-6 custom-card"
         style="border-radius: 0.75rem; border: 1px solid #28A745 !important; background-color: #f9f9f9 !important;
          box-shadow: none !important">
      <div class="text-center mb-5">
        <h2 class="text-900 text-2xl font-semibold mb-2" style="color: #28A745 !important">{{ t('auth.signIn') }}</h2>
        <span class="text-600 font-light text-blue-500">{{ t('auth.noAccount') }}</span>
        <router-link to="/sign-up" class="ml-2 text-blue-500 cursor-pointer font-medium">
          {{ t('auth.registerHere') }}
        </router-link>
      </div>

      <form @submit.prevent="onSignIn">
        <label for="username" class="block text-900 font-medium font-semibold" style="color: #28A745 !important">
          {{ t('auth.username') }}
        </label>
        <pv-input-text v-model="username" id="username" :placeholder="t('auth.usernamePlaceholder')" class="w-full mb-3" />

        <label for="password" class="block text-900 font-medium mb-2 font-semibold" style="color: #28A745 !important">
          {{ t('auth.password') }}
        </label>
        <pv-input-text v-model="password" id="password" type="password" :placeholder="t('auth.passwordPlaceholder')" class="w-full mb-3" />

        <pv-button type="submit" :label="t('auth.login')" icon="pi pi-sign-in" class="w-full" />
        <div v-if="errorMessage" class="text-red-500 mt-3 text-center">{{ errorMessage }}</div>
      </form>
    </div>
  </div>
</template>
