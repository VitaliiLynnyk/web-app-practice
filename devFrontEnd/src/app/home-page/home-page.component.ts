import { Component, OnInit } from '@angular/core';

import { ResService } from '../services/res.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  providers: [ResService]
})
export class HomePageComponent implements OnInit {

  testResources: any;

  constructor(private resService: ResService) { }

  ngOnInit() {
    this.resService.getData()
      .subscribe(
        data => {
          this.testResources = data;
        },
        error => {
          console.log(error);
        }
      );
  }


}


