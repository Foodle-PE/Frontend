<script>
import { useAuthenticationStore } from '/src/authorization/services/authentication.store.js';
import FormRegister from "/src/authorization/components/registration-form.component.vue";
import {SignUpRequest} from "../model/sign-up.request.js";


export default {
  name: "sign-up",
  components: {FormRegister},
  data() {
    return {
      user: {
        firstname: '',
        lastname: '',
        email: '',
        username: '',
        password: '',
        role: ''
      }
    };
  },
  methods: {
    onSignUp() {
      let authenticationStore = useAuthenticationStore();
      let signUpRequest = new SignUpRequest(this.username, this.password, this.role);
      authenticationStore.signUp(signUpRequest, this.$router);

    }
  }
}
</script>

<template>
  <div class="flex justify-content-center align-items-center">
    <div class="flex justify-content-center align-items-center">
      <div class="surface-card border-solid" style="border-color: #29a847 !important;
      border-style: solid !important; border-radius: 0.75rem; background-color: #f9f9f9 !important;
      border-width: 1px">
        <div class="flex justify-content-center">
          <div>
            <div class="flex justify-content-center align-items-center">
            </div>
            <h2 class="flex justify-content-center align-items-center p-4 font-semibold" style="margin-top: 0;color: #29a847 ;">Register</h2>
            <span class="text-600 font-light text-blue-500">¿Tienes cuenta?</span>
            <router-link to="/login" class="ml-2 text-blue-500 cursor-pointer font-medium">
              Inicia Sesion
            </router-link>
          </div>
        </div>

        <form-register @form-submitted="onSignUp" />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
