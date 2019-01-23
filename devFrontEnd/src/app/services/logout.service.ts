import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class LogoutService {

  constructor(private http: HttpClient) {
  }

  postLogoutSignal() {
    const customHeaders = new HttpHeaders().set('token', localStorage.getItem('tokenSession'));
    return this.http.post('https://web-app-practice.herokuapp.com/api/logOut', {}, {headers: customHeaders});
  }

}
