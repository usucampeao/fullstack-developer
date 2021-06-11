import { Component, OnInit, Input } from '@angular/core';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { Property } from 'src/app/app.models';

@Component({
  selector: 'app-properties-carousel',
  templateUrl: './properties-carousel.component.html',
  styleUrls: ['./properties-carousel.component.scss']
})
export class PropertiesCarouselComponent implements OnInit {
  @Input('properties') properties: Array<Property> = [];
  public config: SwiperConfigInterface = {}; 

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(){
    this.config = {
      observer: true,
      slidesPerView: 4,
      spaceBetween: 16,       
      keyboard: true,
      navigation: { nextEl: '.prop-next', prevEl: '.prop-prev'},
      pagination: true,
      grabCursor: true,        
      loop: false,
      preloadImages: true,
      lazy: false,    
      breakpoints: { 
        320: {
          slidesPerView: 1
        },
        600: {
          slidesPerView: 2
        },
        960: {
          slidesPerView: 3
        },
        1280: {
          slidesPerView: 4
        }
      }
    }
  }

}