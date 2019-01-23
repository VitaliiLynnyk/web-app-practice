import { Injectable} from '@angular/core';

@Injectable()
export class AlertService {

  constructor() {  }

  public alertText: string;

  alertSetText(temp: string) {
    this.alertText = temp;
    console.log('set temp - ' + temp);
    console.log('set alertText - ' + this.alertText);
  }

  alertGetText(): string {
    console.log('get alertText - ' + this.alertText);
    const temp = this.alertText;
    console.log('get temp - ' + temp);
    this.alertClearText();
    return temp;
  }

  alertClearText() {
    this.alertText = undefined;
  }

}




