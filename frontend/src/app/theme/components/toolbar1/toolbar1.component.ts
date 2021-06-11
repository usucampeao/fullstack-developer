import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { UserServicesService } from 'src/app/pages/services/userServices.service';

@Component({
  selector: 'app-toolbar1',
  templateUrl: './toolbar1.component.html'
})
export class Toolbar1Component implements OnInit {
  user$ = this.userService.returnuser();
  @Output() onMenuIconClick: EventEmitter<any> = new EventEmitter<any>();
  constructor(public appService:AppService, 
      	      public userService: UserServicesService) { }

  ngOnInit() { }

  public sidenavToggle(){
    this.onMenuIconClick.emit();
  }
}