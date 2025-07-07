<script setup>
import { useAuthenticationStore } from '/src/authorization/services/authentication.store.js'
import FormRegister from '/src/authorization/components/registration-form.component.vue'
import { SignUpRequest } from '../model/sign-up.request.js'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const onSignUp = (user) => {
  const authenticationStore = useAuthenticationStore()

  const signUpRequest = new SignUpRequest(
      user.username,
      user.password,
      user.role,
      user.firstname,
      user.lastname,
      user.email,
      user.phone
  )

  authenticationStore.signUp(signUpRequest, router)
  console.log('Payload final:', signUpRequest)
}
</script>

<template>
  <div class="flex justify-content-center align-items-center">
    <div class="flex justify-content-center align-items-center">
      <div
          class="surface-card border-solid"
          style="border-color: #29a847 !important;
               border-style: solid !important;
               border-radius: 0.75rem;
               background-color: #f9f9f9 !important;
               border-width: 1px;
               margin-top: 20px"
      >
        <div class="flex justify-content-center">
          <div>
            <h2 class="flex justify-content-center align-items-center p-4 font-semibold" style="margin-top: 0; color: #29a847;">
              {{ t('auth.register') }}
            </h2>

            <span class="text-600 font-light text-blue-500">{{ t('auth.haveAccount') }}</span>
            <router-link to="/login" class="ml-2 text-blue-500 cursor-pointer font-medium">
              {{ t('auth.signInHere') }}
            </router-link>
          </div>
        </div>

        <form-register @form-submitted="onSignUp" />
      </div>
    </div>
  </div>
</template>
