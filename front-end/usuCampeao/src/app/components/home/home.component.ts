import { ServiceService } from './service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public itens: Array<any> = [];

  constructor(public service: ServiceService) { }

  ngOnInit(): void {

  }

}
