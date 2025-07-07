<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { User } from '/src/authorization/model/user.entity.js'

const emit = defineEmits(['form-submitted'])
const { t } = useI18n()

const user = ref(new User())
const confirmPassword = ref(null)

function submitForm() {
  if (user.value.password !== confirmPassword.value) {
    console.log(t('register.passwordMismatch'))
    return
  }
  emit('form-submitted', user.value)
  resetForm()
}

function resetForm() {
  user.value = new User()
  confirmPassword.value = null
}
</script>

<template>
  <div class="flex justify-content-center align-items-center p-4 m-3">
    <form @submit.prevent="submitForm" class="flex flex-column">

      <pv-InputGroup class="mb-4 mt-5">
        <label class="px-5 w-4" for="firstname">{{ t('register.firstname') }}</label>
        <pv-InputGroupAddon><i class="pi pi-user"></i></pv-InputGroupAddon>
        <pv-input-text class="w-4" id="firstname" v-model="user.firstname" :placeholder="t('register.firstname')" />
      </pv-InputGroup>

      <pv-InputGroup class="mb-4">
        <label class="px-5 w-4" for="lastname">{{ t('register.lastname') }}</label>
        <pv-InputGroupAddon><i class="pi pi-user"></i></pv-InputGroupAddon>
        <pv-input-text id="lastname" v-model="user.lastname" :placeholder="t('register.lastname')" />
      </pv-InputGroup>

      <pv-InputGroup class="mb-4">
        <label class="px-5 w-4" for="email">{{ t('register.email') }}</label>
        <pv-InputGroupAddon><i class="pi pi-envelope"></i></pv-InputGroupAddon>
        <pv-input-text id="email" v-model="user.email" :placeholder="t('register.email')" />
      </pv-InputGroup>

      <pv-InputGroup class="mb-4">
        <label class="px-5 w-4" for="phone">{{ t('register.phone') }}</label>
        <pv-InputGroupAddon><i class="pi pi-phone"></i></pv-InputGroupAddon>
        <pv-input-text id="phone" v-model="user.phone" :placeholder="t('register.phone')" />
      </pv-InputGroup>

      <pv-InputGroup class="mb-4">
        <label class="px-5 w-4" for="username">{{ t('register.username') }}</label>
        <pv-InputGroupAddon><i class="pi pi-user"></i></pv-InputGroupAddon>
        <pv-input-text id="username" v-model="user.username" :placeholder="t('register.username')" />
      </pv-InputGroup>

      <pv-InputGroup class="mb-4">
        <label class="px-5 w-4" for="password">{{ t('register.password') }}</label>
        <pv-InputGroupAddon><i class="pi pi-lock"></i></pv-InputGroupAddon>
        <pv-password id="password" v-model="user.password" toggleMask :placeholder="t('register.password')">
          <template #header>
            <h6>{{ t('register.pickPassword') }}</h6>
          </template>
          <template #footer>
            <pv-divider />
            <p class="mt-2">{{ t('register.suggestionsTitle') }}</p>
            <ul class="pl-2 ml-2 mt-0" style="line-height: 1.5">
              <li>{{ t('register.suggestion.lowercase') }}</li>
              <li>{{ t('register.suggestion.uppercase') }}</li>
              <li>{{ t('register.suggestion.numeric') }}</li>
              <li>{{ t('register.suggestion.minLength') }}</li>
            </ul>
          </template>
        </pv-password>
      </pv-InputGroup>

      <pv-InputGroup class="mb-4">
        <label class="px-5 w-4" for="confirmPassword">{{ t('register.confirmPassword') }}</label>
        <pv-InputGroupAddon><i class="pi pi-lock"></i></pv-InputGroupAddon>
        <pv-password v-model="confirmPassword" id="confirmPassword" :placeholder="t('register.confirmPassword')" toggleMask />
      </pv-InputGroup>

      <div class="card flex justify-content-center" style="margin-bottom:1rem;">
        <div class="flex flex-wrap gap-3">
          <div class="flex align-items-center">
            <pv-radioButton v-model="user.role" inputId="owner" name="owner" value="Owner" />
            <label for="owner" class="ml-2">{{ t('register.role.owner') }}</label>
          </div>
          <div class="flex align-items-center">
            <pv-radioButton v-model="user.role" inputId="employee" name="employee" value="Employee" />
            <label for="employee" class="ml-2">{{ t('register.role.employee') }}</label>
          </div>
        </div>
      </div>

      <div style="text-align:center;" class="centered-button">
        <pv-button class="centered-button" type="submit" style="width:100%;">
          {{ t('register.submit') }}
        </pv-button>
      </div>
    </form>
  </div>
</template>

<style scoped>

.centered-button {
  display: flex;
  justify-content: center;
  align-items: center;
}
.ml-2{
  color: #28A745;
}



</style>
