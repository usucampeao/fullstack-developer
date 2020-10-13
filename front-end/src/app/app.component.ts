import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '@app/core/services/local-storage.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    constructor(
        private localStorage: LocalStorageService,
    ) { }

    ngOnInit() {
    }
}
