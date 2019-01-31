import { Component, OnChanges, OnInit, Directive, HostListener } from '@angular/core';
import { faHome, faFileAlt, faPollH, faSignOutAlt, faBars } from '@fortawesome/free-solid-svg-icons';

/*
@Directive({
  selector: '[appMenuLink]'
})
*/

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

  constructor() {  }

/*
  @HostListener('click') chooseMenuLink() {
    if (window.screen.availWidth >= 767) {
      this.sidebarVisible = false;
    }
  }
*/

  ngOnChanges() {
  }

  ngOnInit() {
  }

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }


}
