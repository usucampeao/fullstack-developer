import { Injectable } from '@angular/core';
import Property from 'src/app/shared/models/property.model';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  constructor() { }

  exists(property: Property) {
    const favorites = this.get();

    const findProperty = favorites.find(favorite => favorite.id === property.id);

    return !!findProperty;
  }

  save(property: Property) {
    const favorites = this.get();

    const findProperty = favorites.find(favorite => favorite.id === property.id);

    if (!findProperty) {
      favorites.push(property);
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  }

  get(): Property[] {
    const favorites = localStorage.getItem('favorites');
    if (!favorites) {
      return [];
    } else {
       return JSON.parse(favorites);
    }
  }

  remove(property: Property) {
    const favorites = this.get();

    const findPropertyIndex = favorites.findIndex(favorite => favorite.id === property.id);

    if (findPropertyIndex >= 0) {
      favorites.splice(findPropertyIndex, 1);
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  }
}
