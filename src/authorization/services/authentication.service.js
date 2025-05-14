import http from "../../shared/services/http.js";

export class AuthenticationService {
    signIn(signInRequest) {
        return http.get('/users', signInRequest);
    }

    signUp(signUpRequest) {
        return http.post('/users', signUpRequest);
    }

}