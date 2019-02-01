import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

@Injectable()
export class UsersService {

    constructor(private http: HttpClient) {
    }

    static createHeaderToken() {
        return new HttpHeaders().set('token', localStorage.getItem('tokenSession'));
    }

    getUserList() {

    }
}

