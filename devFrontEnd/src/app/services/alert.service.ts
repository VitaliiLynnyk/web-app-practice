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

  alertSetSubject(data: string, type: string, status?: number, time?: number) {
    if (status === 0) { data = 'No internet connection or server error.'; }
    const temp: AlertObject = {
      messageAlert: data,
      typeAlert: type,
      timeAlert: time
    };
    this.alertSubject.next(temp);
  }
}
