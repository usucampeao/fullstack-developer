import { MENU_ROUTES_TOOLBAR } from '@app/models/index';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-menu-dropdown',
    templateUrl: './menu-dropdown.component.html'
})
export class MenuDropdownComponent implements OnInit {
    public menuitens: any[];

    constructor() {
        this.menuitens = MENU_ROUTES_TOOLBAR;
    }

    ngOnInit() {

    }

}
