import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-home-statistic-item',
    templateUrl: './home-statistic-item.component.html',
    styleUrls: ['./home-statistic-item.component.scss']
})
export class HomeStatisticItemComponent implements OnInit {

    @Input() public description: string;
    @Input() public count: number;

    constructor() {
    }

    ngOnInit() {
    }
}
