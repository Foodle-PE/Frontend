<script>
import { useAuthenticationStore } from '/src/authorization/services/authentication.store.js'
import { SignInRequest } from '../model/login.request.js'


export default {
  name: "login",
  components: {},
  data() {
    return {
      checked1: false, // or any default value you want
      errorMessage: '', // or any default value you want
      username: '',
      password: ''
    };
  },
  created() {

  },
  methods: {
    onSignIn() {
      let authenticationStore = useAuthenticationStore();
      let signInRequest = new SignInRequest(this.username, this.password);
      authenticationStore.signIn(signInRequest, this.$router);
    }
  }
}
</script>

<template>
  <div class="flex justify-content-center align-items-center" style="height: 100vh; background-color: #f9f9f9" >
    <div class="surface-card p-4 w-full lg:w-6 custom-card"
         style="border-radius: 0.75rem; border: 1px solid #28A745 !important; background-color: #f9f9f9 !important;
          box-shadow: none !important">
      <div class="text-center mb-5">

        <h2 class="text-900 text-2xl font-semibold mb-2" style="color: #28A745 !important">Inicia sesión</h2>
        <span class="text-600 font-light text-blue-500">¿No tienes cuenta?</span>
        <router-link to="/sign-up" class="ml-2 text-blue-500 cursor-pointer font-medium">
          Regístrate aquí
        </router-link>
      </div>

      <form @submit.prevent="onSignIn">
        <label for="username" class="block text-900 font-medium font-semibold" style="color: #28A745 !important">Usuario</label>
        <pv-input-text v-model="username" id="username" placeholder="Tu usuario" class="w-full mb-3" />

        <label for="password" class="block text-900 font-medium mb-2 font-semibold" style="color: #28A745 !important">Contraseña</label>
        <pv-input-text v-model="password" id="password" type="password" placeholder="Tu contraseña" class="w-full mb-3" />


    <pv-button type="submit" label="Ingresar" icon="pi pi-sign-in" class="w-full" />
    <div v-if="errorMessage" class="text-red-500 mt-3 text-center">{{ errorMessage }}</div>
    </form>
  </div>
  </div>
</template>
