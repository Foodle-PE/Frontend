import http from "../../shared/services/http";

export class IamApiService {
    signUpUser(user) {
        return http.post("/authentication/sign-up", {
            username: user.username,
            password: user.password,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            phone: user.phone,
            role: user.role
        });
    }

    async signInUser(username, password) {
        try {
            const response = await http.post("/authentication/sign-in", { username, password });
            return response.data;
        } catch (error) {
            console.error('Error signing in user:', error);
            throw error;
        }
    }
}
