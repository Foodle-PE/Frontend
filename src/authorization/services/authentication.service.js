import http from "../../shared/services/http.js";

export class AuthenticationService {
    signIn(signInRequest) {
        return http.post('/authentication/login', signInRequest);
    }

    signUp(signUpRequest) {
        return http.post('/authentication/sign-up', signUpRequest);
    }

}