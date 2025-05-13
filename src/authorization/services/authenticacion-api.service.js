import http from "../../shared/services/http";

export class IamApiService{

    signUpUser(user) {
        return http.post("/authentication/sign-up", {
            username: user.username,
            password: user.password,

        });
    }

    createProfile(user) {
        return http.post("/profiles", {
            firstName: user.firstname,
            lastName: user.lastname,
            email: user.email,

        });
    }

    async signInUser(username, password) {
        try {
            const response = await http.post("/authentication/login", { username, password });
            return response.data;
        } catch (error) {
            console.error('Error signing in user:', error);
            throw error;
        }
    }
}