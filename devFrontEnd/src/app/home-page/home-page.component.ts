import { Component, OnChanges, OnInit } from '@angular/core';
import { faHome, faFileAlt, faPollH, faSignOutAlt, faBars } from '@fortawesome/free-solid-svg-icons';

import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnChanges, OnInit {

  sidebarVisible = false;
  burgerIcon = faBars;
  homeIcon = faHome;
  completedSurveyIcon = faFileAlt;
  newSurveyIcon = faPollH;
  logoutIcon = faSignOutAlt;

  constructor(private alertService: AlertService) {
  }

  ngOnChanges() {
  }

  ngOnInit() {
    // this.alertService.alertSetSubject('It is test alert!', 'danger', 401, 100000);
  }

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }



}


