import { Component, OnInit } from '@angular/core';
import { FavoritesService } from 'src/app/core/services/favorites.service';
import Property from 'src/app/shared/models/property.model';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.sass']
})
export class FavoritesComponent implements OnInit {

  public processing: boolean = false;

  public properties: Property[];

  constructor(
    private favoritesService: FavoritesService) { }

  ngOnInit(): void {
    this.loadProperties();
  }

  loadProperties() {
    this.properties = this.favoritesService.get();
  }
}
