import { Injectable} from '@angular/core';

@Injectable()
export class AlertService {

  constructor() {  }

  private alertText: string;

  alertSetText(temp: string) {
    this.alertText = temp;
    console.log('set - ' + temp);
  }

  alertGetText() {
    const temp = this.alertText;
    console.log('get - ' + temp);
    this.alertClearText();
    return temp;
  }

  alertClearText() {
    this.alertText = undefined;
  }

}




