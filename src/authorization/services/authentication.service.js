import http from "../../shared/services/http.js";

export class AuthenticationService {

    // Simulación de registro (sign-up)
    async signUp(signUpRequest) {
        try {
            const response = await http.post("/users", {
                username: signUpRequest.username,
                password: signUpRequest.password,
                firstname: signUpRequest.firstname,
                lastname: signUpRequest.lastname,
                email: signUpRequest.email,
                phone: signUpRequest.phone,
                role: signUpRequest.role
            });

            return response.data;
        } catch (error) {
            console.error("Error en sign-up:", error);
            throw error;
        }
    }

    // Simulación de login (sign-in)
    async signIn(signInRequest) {
        try {
            const response = await http.get("/users", {
                params: {
                    username: signInRequest.username,
                    password: signInRequest.password
                }
            });

            if (response.data.length > 0) {
                const user = response.data[0];
                return {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    role: user.role,
                    token: "fake-jwt-token"
                };
            } else {
                throw new Error("Credenciales incorrectas");
            }
        } catch (error) {
            console.error("Error en sign-in:", error);
            throw error;
        }
    }
}
