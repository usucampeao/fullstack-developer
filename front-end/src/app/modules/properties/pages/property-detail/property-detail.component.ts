import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/core/services/notification.service';
import { PropertiesService } from 'src/app/core/services/properties.service';
import { FavoritesService } from 'src/app/core/services/favorites.service';
import Property from 'src/app/shared/models/property.model';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.sass']
})
export class PropertyDetailComponent implements OnInit {

  public processing: boolean = false;

  public isFavorite: boolean = true;

  public property: Property;

  constructor(
    private propertiesService: PropertiesService,
    private notificationService: NotificationService,
    private favoritesService: FavoritesService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.loadProperty();
  }

  loadProperty() {
    this.processing = true;

    const id = this.route.snapshot.paramMap.get('id');

    this.propertiesService.show(id)
      .subscribe(
        success => this.handleSuccess(success),
        error => this.handleError(error)
      );
  }

  saveFavorite(){
    this.favoritesService.save(this.property);
    this.isFavorite = true;
  }

  private handleSuccess(response) {
    this.processing = false;
    this.property = response;

    this.isFavorite = this.favoritesService.exists(this.property);
  }

  private handleError(response) {
    this.processing = false;
    const msg = response.error.message;
    this.notificationService.notify(`Ocorreu um erro: ${msg}`);
    this.router.navigate(['/']);
  }
}
