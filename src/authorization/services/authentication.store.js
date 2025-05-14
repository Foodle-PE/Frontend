import { AuthenticationService } from "./authentication.service.js";
import { defineStore } from "pinia";
import { SignInResponse } from "../model/login.response.js";
import { SignUpResponse } from "../model/sign-up.response.js";

const authenticationService = new AuthenticationService();

export const useAuthenticationStore = defineStore('authentication', {
    state: () => ({
        signedIn: false,
        userId: 0,
        username: '',
        role: '',
        errorMessage: ''
    }),
    getters: {
        isSignedIn: (state) => state.signedIn,
        currentUserId: (state) => state.userId,
        currentUsername: (state) => state.username,
        currentRole: (state) => state.role,
        currentToken: () => localStorage.getItem('token')
    },
    actions: {
        async signIn(signInRequest, router) {
            try {
                const user = await authenticationService.signIn(signInRequest);

                // Validar que user tenga las propiedades necesarias
                if (!user || !user.id || !user.username || !user.token) {
                    throw new Error("Datos incompletos del usuario.");
                }

                // Crear respuesta con los datos
                const signInResponse = new SignInResponse(user.id, user.username, user.token, user.role);

                // Actualizar estado del store
                this.signedIn = true;
                this.userId = signInResponse.id;
                this.username = signInResponse.username;
                this.errorMessage = '';

                // Guardar token en localStorage
                localStorage.setItem('token', signInResponse.token);

                // Redirigir a home
                router.push({ name: 'home' });

            } catch (error) {
                // Capturar y guardar mensaje de error
                this.errorMessage = error.message || 'Error desconocido';
                this.signedIn = false;
                this.userId = 0;
                this.username = '';
                this.role = '';

                console.error("Error en signIn:", error);

                // Redirigir al login en caso de error
                router.push({ name: 'login' });
            }
        },

        async signUp(signUpRequest, router) {
            try {
                const response = await authenticationService.signUp(signUpRequest);
                const signUpResponse = new SignUpResponse(response.data.message);
                console.log(signUpResponse);
                router.push({ name: 'login' });
            } catch (error) {
                console.error(error);
                router.push({ name: 'sign-up' });
            }
        },

        async signOut(router) {
            this.signedIn = false;
            this.userId = 0;
            this.username = '';
            this.role = '';
            localStorage.removeItem('token');
            router.push({ name: 'login' });
        }
    }
});
