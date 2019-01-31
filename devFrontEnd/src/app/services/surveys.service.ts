import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class SurveysService {

  constructor(private http: HttpClient) { }

  static createHeaderToken () {
    return new HttpHeaders().set('token', localStorage.getItem('tokenSession'));
  }

  getSurveysList() {
    return this.http.get(
      'https://web-app-practice.herokuapp.com/api/surveys',
      {headers: SurveysService.createHeaderToken()}
      );
  }

}
