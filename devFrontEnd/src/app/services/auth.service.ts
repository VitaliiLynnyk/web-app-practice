import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) {
  }

  postLogIn(loginData) {
    const bodyQuery = {email: loginData.loginEmail, password: loginData.loginPassword};
    return this.http.post('https://web-app-practice.herokuapp.com/api/signIn', bodyQuery);
  }

  postLogOut() {
    const customHeaders = new HttpHeaders().set('token', localStorage.getItem('tokenSession'));
    return this.http.post('https://web-app-practice.herokuapp.com/api/logOut', {}, {headers: customHeaders});
  }

  postAuthentication() {
    const customHeaders = new HttpHeaders().set('token', localStorage.getItem('tokenSession'));
    return this.http.post('https://web-app-practice.herokuapp.com/api/authentication', {}, {headers: customHeaders});
  }


}



