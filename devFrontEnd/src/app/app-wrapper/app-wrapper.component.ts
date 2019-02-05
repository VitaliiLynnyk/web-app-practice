import {Component, OnInit} from '@angular/core';
import {faSignOutAlt, faBars} from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-app-wrapper',
    templateUrl: './app-wrapper.component.html',
    styleUrls: ['./app-wrapper.component.scss']
})

export class AppWrapperComponent implements OnInit {

    public sidebarVisible = false;
    burgerIcon = faBars;
    logoutIcon = faSignOutAlt;
    userName: string;

    constructor() {
    }

    ngOnInit() {
        this.userName = localStorage.getItem('userName');
    }

    toggleSidebar() {
        this.sidebarVisible = !this.sidebarVisible;
    }

    stopEventClick(event) {
        event.stopPropagation();
    }

    closeMenu(closeCommand: boolean) {
        this.sidebarVisible = closeCommand;
    }
}