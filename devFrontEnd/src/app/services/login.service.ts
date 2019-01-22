import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable()
export class LoginService {

  constructor(private http: HttpClient) {
  }

  postLoginData(loginData) {
    const bodyQuery = {email: loginData.loginEmail, password: loginData.loginPassword};
    console.log(bodyQuery);
    return this.http.post('https://web-app-practice.herokuapp.com/api/signIn', bodyQuery);
  }



}




