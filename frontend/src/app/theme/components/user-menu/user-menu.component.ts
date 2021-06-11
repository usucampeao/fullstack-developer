import { Component, OnInit, ɵɵsetComponentScope } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { UserServicesService } from 'src/app/pages/services/userServices.service';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
})
export class UserMenuComponent {
  // o $ na variável indica, por convenção, que ela é um observable
  user$ = this.userService.returnuser();
  email: string;
  nome: string;

  constructor(
    public appService: AppService,
    public userService: UserServicesService,
    public router: Router
  ) {}

  logout() {
    this.userService.logout();
    window.location.reload();
  }
}
