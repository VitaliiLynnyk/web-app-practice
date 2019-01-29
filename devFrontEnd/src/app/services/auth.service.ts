import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AuthService {

  customHeaders = new HttpHeaders().set('token', localStorage.getItem('tokenSession'));

  constructor(private http: HttpClient) {
  }

  postLogIn(loginData) {
    const bodyQuery = {email: loginData.loginEmail, password: loginData.loginPassword};
    return this.http.post(
      'https://web-app-practice.herokuapp.com/api/signIn',
      bodyQuery
    );
  }

  postLogOut() {
    return this.http.post(
      'https://web-app-practice.herokuapp.com/api/logOut',
      {},
      {headers: this.customHeaders}
      );
  }

  postAuthentication() {
    return this.http.post(
      'https://web-app-practice.herokuapp.com/api/authentication',
      {},
      {headers: this.customHeaders}
      );
  }


}



