import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/core/services/auth.service';

import { ThemingService } from '@app/core/services/theming.service';

@Component({
    selector: 'app-account-card',
    templateUrl: './account-card.component.html',
    styleUrls: ['./account-card.component.scss']
})
export class AccountCardComponent implements OnInit {
    currentTheme: string;
    user: any;

    constructor(private theming: ThemingService, private auth: AuthService) { 
        this.user = this.auth.currentUserValue;
    }

    ngOnInit() {
        this.currentTheme = this.theming.get();
    }

    public changeTheme(themeName: string): void {
        this.currentTheme = themeName;
        this.theming.set(themeName);
    }
}
