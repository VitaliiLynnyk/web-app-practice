import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class UsersService {

    constructor(private http: HttpClient) {
    }

    static createHeaderToken() {
        return new HttpHeaders().set('token', localStorage.getItem('tokenSession'));
    }

    getUserList() {
        return this.http.get(
            'https://web-app-practice.herokuapp.com/api/personsList',
            {
                headers: UsersService.createHeaderToken()
            }
        );
    }
}
