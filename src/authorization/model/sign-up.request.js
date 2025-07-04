export class SignUpRequest {
    constructor(username, password, role, firstname, lastname, email, phone) {
        this.username = username;
        this.password = password;
        this.role = role;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.phone = phone;
    }
}