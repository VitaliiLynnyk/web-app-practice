import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map} from 'rxjs/operators';
import {TestRes} from '../interfaces/interfaces-list';

@Injectable()
export class ResService {

  constructor(private http: HttpClient) { }

/*  getResData(): Observable<TestRes[]> {
    return this.http.get('https://web-app-practice.herokuapp.com/api/res').pipe(map(data => {
      const resList = data;
      return resList.map(function(testRes: any) {
        return {id: testRes.id, userId: testRes.person.id, token: testRes.token};
      });
    }));
  }*/

  getData() {
    // debugger;
    // console.log(this.http.get('https://web-app-practice.herokuapp.com/api/res'));
    return this.http.get('https://web-app-practice.herokuapp.com/api/res');
  }

}

