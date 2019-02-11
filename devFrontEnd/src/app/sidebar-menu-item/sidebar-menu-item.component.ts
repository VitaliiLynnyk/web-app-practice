import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {faFileAlt, faHome, faPenSquare} from '@fortawesome/free-solid-svg-icons';

const menuItemArray = [
    {
        name: 'Home',
        icon: faHome,
        link: '/home'
    },
    {
        name: 'Surveys list',
        icon: faFileAlt,
        link: '/home/surveys-list'
    },
    {
        name: 'New survey',
        icon: faPenSquare,
        link: '/home/create-survey'
    }
];

@Component({
    selector: 'app-sidebar-menu-item',
    templateUrl: './sidebar-menu-item.component.html',
    styleUrls: ['./sidebar-menu-item.component.scss']
})
export class SidebarMenuItemComponent implements OnInit {

    @Output() changeMenuState = new EventEmitter<boolean>();

    public  itemArray = menuItemArray;

    constructor() {
    }

    ngOnInit() {
    }

    changeMenu() {
        this.changeMenuState.emit(false);
    }
}
