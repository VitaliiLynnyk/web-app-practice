import { Injectable} from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { AlertObject } from '../interfaces/interfaces-list';

@Injectable()
export class AlertService {
  alertSubscription$: Observable<any>;
  private alertSubject = new Subject<any>();

  constructor() {
    this.alertSubscription$ = this.alertSubject.asObservable();
  }

  alertSetSubject(data, type) {
    const temp: AlertObject = {
      messageAlert: data,
      typeAlert: type
    };
    this.alertSubject.next(temp);
  }

}
