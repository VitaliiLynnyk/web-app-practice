import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-not-found',
    templateUrl: './not-found.component.html',
    styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

    public goBackIcon = faArrowLeft;

    constructor(private location: Location) {
    }

    ngOnInit() {
    }

    goBackHistory() {
        this.location.back();
    }
}
