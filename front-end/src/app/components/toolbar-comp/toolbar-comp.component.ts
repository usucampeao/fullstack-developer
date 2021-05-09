import { Router } from '@angular/router';
import { ServiceService } from './../home/service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toolbar-comp',
  templateUrl: './toolbar-comp.component.html',
  styleUrls: ['./toolbar-comp.component.scss']
})
export class ToolbarCompComponent implements OnInit {

  constructor(public service: ServiceService, private router: Router) { }

  ngOnInit(): void {
  }

  onClickb1() {
    if (!this.service.getStatusLogin()) {
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/add-prop']);
    }
  }

}
