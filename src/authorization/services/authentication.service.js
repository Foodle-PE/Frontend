import http from "../../shared/services/http.js"; // Asegúrate de que esta instancia tenga el baseURL correcto

export class AuthenticationService {

    // Registro (Sign-up)
    async signUp(signUpRequest) {
        try {
            const response = await http.post("/authentication/sign-up", {
                username: signUpRequest.username,
                password: signUpRequest.password,
                firstName: signUpRequest.firstname,
                lastName: signUpRequest.lastname,
                email: signUpRequest.email,
                phone: signUpRequest.phone,
                role: signUpRequest.role
            });

            return response.data; // { message: "...", userId: ... }
        } catch (error) {
            console.error("Error en sign-up:", error);
            throw error;
        }
    }

    // Inicio de sesión (Sign-in)
    async signIn(signInRequest) {
        try {
            const response = await http.post("/authentication/sign-in", {
                username: signInRequest.username,
                password: signInRequest.password
            });

            return response.data;
            // { id, username, token, role }
        } catch (error) {
            console.error("Error en sign-in:", error);
            throw error;
        }
    }
}