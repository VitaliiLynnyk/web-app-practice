import {Component, OnChanges, OnInit/*, Directive, HostListener*/} from '@angular/core';
import {faHome, faFileAlt, faPenSquare, faSignOutAlt, faBars} from '@fortawesome/free-solid-svg-icons';

/*
@Directive({
  selector: '[appMenuLink]'
})
export class HomePageDirective {
  @HostListener('click') chooseMenuLink() {
    console.log('->\n', 'HomePageComponent.prototype.sidebarVisible');
    if (window.screen.availWidth >= 767) {
      console.log('->\n', 'HomePageComponent.prototype.sidebarVisible');
      HomePageComponent.prototype.sidebarVisible = false;
      console.log('<-\n', 'HomePageComponent.prototype.sidebarVisible');
    }
  }
}
*/

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss']
})

export class HomePageComponent implements OnChanges, OnInit {

    public sidebarVisible = false;
    burgerIcon = faBars;
    homeIcon = faHome;
    completedSurveyIcon = faFileAlt;
    newSurveyIcon = faPenSquare;
    logoutIcon = faSignOutAlt;

    constructor() {
    }

    ngOnChanges() {
    }

    ngOnInit() {
    }

    toggleSidebar() {
        this.sidebarVisible = !this.sidebarVisible;
    }


}

