import { Component, Input, OnInit } from '@angular/core';

import Property from '../../../../shared/models/property.model';

@Component({
  selector: 'app-property-card',
  templateUrl: './property-card.component.html',
  styleUrls: ['./property-card.component.sass']
})
export class PropertyCardComponent implements OnInit {

  @Input()
  property: Property;

  constructor() { }

  ngOnInit(): void {
  }

}
