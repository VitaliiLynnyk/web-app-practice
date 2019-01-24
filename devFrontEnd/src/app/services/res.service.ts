import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable()
export class ResService {

  constructor(private http: HttpClient) { }

  getData() {
    return this.http.get('https://web-app-practice.herokuapp.com/api/person_token');
  }

}

