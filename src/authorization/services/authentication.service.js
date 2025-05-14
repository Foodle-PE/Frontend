import http from "../../shared/services/http.js";

export class AuthenticationService {
    signIn(signInRequest) {
        return http.get('/users', {params: {username: signInRequest.username}})
            .then(response => {
                if (!response.data || response.data.length === 0) {
                    throw new Error("Usuario no encontrado");
                }

                const user = response.data[0];

                if (!user.password || user.password !== signInRequest.password) {
                    throw new Error("Contraseña incorrecta");
                }

                // Simulamos un token (puede ser cualquier string único)
                user.token = "token-simulado-" + Date.now();

                return user;
            });
    }
    signUp(signUpRequest) {
        return http.post('/users', signUpRequest);
    }

}