import { Component, Input, EventEmitter } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from '@app/core/services/auth.service';
import { DialogService } from '@app/services/dialog.service';

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html'
})
export class ToolbarComponent {
    private toggleMenu: boolean;
    @Input() showMenu: boolean;
    @Input() showAccount: boolean;
    @Input() showLogout: boolean;
    @Input() toggleMenu$: EventEmitter<boolean> | boolean;
    @Input() sidenav: MatSidenav;

    constructor(private confirm: DialogService, private authService: AuthService) {
    }

    onToggleMenu(): void {
        this.toggleMenu = !this.toggleMenu;
        this.sidenav.toggle();

        if (this.toggleMenu$ instanceof EventEmitter) {
            this.toggleMenu$.emit(this.toggleMenu);
        }
    }

    public openLogoutDialog(): void {
        this.confirm.openConfirmDialog(`Tem certeza que deseja sair?`)
        .afterClosed().subscribe(res =>{
          if(res){
            this.authService.logout();
          }
        });

    }
    

}
