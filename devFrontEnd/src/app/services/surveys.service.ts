import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class SurveysService {

  customHeaders = new HttpHeaders().set('token', localStorage.getItem('tokenSession'));

  constructor(private http: HttpClient) { }

  getSurveysList() {
    return this.http.get(
      'https://web-app-practice.herokuapp.com/api/survays',
      {headers: this.customHeaders}
      );
  }



}
