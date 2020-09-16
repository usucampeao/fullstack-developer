import { Component, OnInit } from '@angular/core';
import Property from 'src/app/shared/models/property.model';

import { NotificationService } from '../../../../core/services/notification.service';
import { PropertiesService } from '../../../../core/services/properties.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  public processing: boolean = false;

  public properties: Property[];

  constructor(
    private propertiesService: PropertiesService,
    private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.loadProperties();
  }

  loadProperties() {
    this.processing = true;

    this.propertiesService.all()
      .subscribe(
        success => this.handleSuccess(success),
        error => this.handleError(error)
      );
  }

  private handleSuccess(response) {
    this.processing = false;
    this.properties = response;
  }

  private handleError(response) {
    this.processing = false;
    const msg = response.error.message;
    this.notificationService.notify(`Ocorreu um erro: ${msg}`);
  }
}
