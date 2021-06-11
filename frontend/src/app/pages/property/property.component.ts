import {
  Component,
  OnInit,
  ViewChild,
  HostListener,
  ViewChildren,
  QueryList,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { Property } from 'src/app/app.models';
import { SwiperConfigInterface, SwiperDirective } from 'ngx-swiper-wrapper';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { AppSettings, Settings } from 'src/app/app.settings';
import { emailValidator } from 'src/app/theme/utils/app-validators';
import { environment } from 'src/environments/environment';

const API = environment.urlAPI;

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.scss'],
})
export class PropertyComponent implements OnInit {
  @ViewChild('sidenav') sidenav: any;
  @ViewChildren(SwiperDirective) swipers: QueryList<SwiperDirective>;
  public psConfig: PerfectScrollbarConfigInterface = {
    wheelPropagation: true,
  };
  public sidenavOpen: boolean = true;
  public config: SwiperConfigInterface = {};
  public config2: SwiperConfigInterface = {};
  private sub: any;
  public property: Property;
  public settings: Settings;
  public embedVideo: any;
  public relatedProperties: Property[];
  public featuredProperties: Property[];
  public agent: any;
  public mortgageForm: FormGroup;
  public monthlyPayment: any;
  public contactForm: FormGroup;
  public id: string;
  public urlOriginal: string;
  constructor(
    public appSettings: AppSettings,
    public appService: AppService,
    private activatedRoute: ActivatedRoute,
    public fb: FormBuilder
  ) {
    this.settings = this.appSettings.settings;
  }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params.id;
    this.getPropertyById(this.id);

    if (window.innerWidth < 960) {
      this.sidenavOpen = false;
      if (this.sidenav) {
        this.sidenav.close();
      }
    }

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  @HostListener('window:resize')
  public onWindowResize(): void {
    window.innerWidth < 960
      ? (this.sidenavOpen = false)
      : (this.sidenavOpen = true);
  }

  public getPropertyById(id) {
    this.appService.getPropertyById(id).subscribe((data) => {
      this.property = data;
      console.log(this.property);
      this.urlOriginal = `${API}/imgs/${this.property.photo_url}`;
      setTimeout(() => {
        this.config.observer = true;
        this.config2.observer = true;
        this.swipers.forEach((swiper) => {
          if (swiper) {
            swiper.setIndex(0);
          }
        });
      });
    });
  }

  ngAfterViewInit() {
    this.config = {
      observer: false,
      slidesPerView: 1,
      spaceBetween: 0,
      keyboard: true,
      navigation: true,
      pagination: false,
      grabCursor: true,
      loop: false,
      preloadImages: false,
      lazy: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
    };

    this.config2 = {
      observer: false,
      slidesPerView: 4,
      spaceBetween: 16,
      keyboard: true,
      navigation: false,
      pagination: false,
      grabCursor: true,
      loop: false,
      preloadImages: false,
      lazy: true,
      breakpoints: {
        200: {
          slidesPerView: 2,
        },
        480: {
          slidesPerView: 3,
        },
        600: {
          slidesPerView: 4,
        },
      },
    };
  }

  public onOpenedChange() {
    this.swipers.forEach((swiper) => {
      if (swiper) {
        swiper.update();
      }
    });
  }


  public onIndexChange(index: number) {
    this.swipers.forEach((swiper) => {
      let elem = swiper['elementRef'].nativeElement;
      if (elem.id == 'small-carousel') {
        swiper.setIndex(index);
        for (let i = 0; i < elem.children[0].children.length; i++) {
          const element = elem.children[0].children[i];
          if (element.classList.contains('thumb-' + index)) {
            element.classList.add('active-thumb');
          } else {
            element.classList.remove('active-thumb');
          }
        }
      }
    });
  }


}


