import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-prop-item',
  templateUrl: './prop-item.component.html',
  styleUrls: ['./prop-item.component.scss']
})



export class PropItemComponent implements OnInit {


  @Input() itens: Array<Propierte> = [];
  @Input() itensStatus: boolean = false;

  constructor() { }


  ngOnInit(): void {



  }

}

interface Propierte {
  image: string,
  publication_date: '',
  title: '',
  description: '',
  value: '',
  area: '',
  address: {
    public_place: '',
    district: '',
    postal_code: '',
    city: '',
    uf: ''
  }
}

