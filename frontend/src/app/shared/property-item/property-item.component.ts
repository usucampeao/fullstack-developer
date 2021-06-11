import {
  Component,
  OnInit,
  Input,
  ViewChild,
  SimpleChange,
} from '@angular/core';
import {
  SwiperDirective,
  SwiperConfigInterface,
  SwiperPaginationInterface,
} from 'ngx-swiper-wrapper';
import { Property } from '../../app.models';
import { Settings, AppSettings } from '../../app.settings';

import { AppService } from '../../app.service';
import { environment } from 'src/environments/environment';

const API = environment.urlAPI;

@Component({
  selector: 'app-property-item',
  templateUrl: './property-item.component.html',
  styleUrls: ['./property-item.component.scss'],
})
export class PropertyItemComponent implements OnInit {
  private urlOriginal = '';
  @Input() property: Property;
  @Input() viewType: string = 'grid';
  @Input() viewColChanged: boolean = false;
  @Input() fullWidthPage: boolean = true;

  public column: number = 4;
  // public address:string;
  @ViewChild(SwiperDirective) directiveRef: SwiperDirective;
  public config: SwiperConfigInterface = {};
  private pagination: SwiperPaginationInterface = {
    el: '.swiper-pagination',
    clickable: true,
  };
  public settings: Settings;
  constructor(public appSettings: AppSettings, public appService: AppService) {
    this.settings = this.appSettings.settings;
  }

  ngOnInit() {
    this.urlOriginal = `${API}/imgs/${this.property.photo_url}`;
  }

  ngAfterViewInit() {
    this.initCarousel();
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    if (changes.viewColChanged) {
      this.getColumnCount(changes.viewColChanged.currentValue);
      if (!changes.viewColChanged.isFirstChange()) {
        if (this.property.gallery.length > 1) {
          this.directiveRef.update();
        }
      }
    }
  }

  public getColumnCount(value) {
    if (value == 25) {
      this.column = 4;
    } else if (value == 33.3) {
      this.column = 3;
    } else if (value == 50) {
      this.column = 2;
    } else {
      this.column = 1;
    }
  }

  public getStatusBgColor(status) {
    switch (status) {
      case 'Para Vender':
        return '#558B2F';
      case 'Para Alugar':
        return '#1E88E5';
      case 'Sem Taxas':
        return '#FFA000';
      case 'Hot Offer':
        return '#F44336';
      case 'Vendido':
        return '#000';
      default:
        return '#01579B';
    }
  }

  public initCarousel() {
    this.config = {
      slidesPerView: 1,
      spaceBetween: 0,
      keyboard: false,
      navigation: true,
      pagination: this.pagination,
      grabCursor: true,
      loop: true,
      preloadImages: false,
      lazy: true,
      nested: true,
      speed: 500,
      effect: 'slide',
    };
  }



  public onFavorites() {
    return this.appService.Data.favorites.filter(
      (item) => item.id == this.property.id
    )[0];
  }
}
