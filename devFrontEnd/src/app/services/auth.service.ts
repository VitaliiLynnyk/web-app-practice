import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class AuthService {

    constructor(private http: HttpClient) {
    }

    static createHeaderToken() {
        return new HttpHeaders().set('token', localStorage.getItem('tokenSession'));
    }

    postLogIn(loginData: any) {
        return this.http.post(
            'https://web-app-practice.herokuapp.com/api/signIn',
            {
                email: loginData.loginEmail,
                password: loginData.loginPassword
            }
        );
    }

    postLogOut() {
        return this.http.post(
            'https://web-app-practice.herokuapp.com/api/logOut',
            {},
            {headers: AuthService.createHeaderToken()}
        );
    }

    postAuthentication() {
        return this.http.post(
            'https://web-app-practice.herokuapp.com/api/authentication',
            {},
            {headers: AuthService.createHeaderToken()}
        );
    }
}
