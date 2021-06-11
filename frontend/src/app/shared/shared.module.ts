import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  wheelPropagation: false,
  suppressScrollX: true,
};

import { AgmCoreModule } from '@agm/core';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';

import { PipesModule } from '../theme/pipes/pipes.module';
import { DirectivesModule } from '../theme/directives/directives.module';

import { HeaderImageComponent } from './header-image/header-image.component';
import { PropertyItemComponent } from './property-item/property-item.component';
import { LoadMoreComponent } from './load-more/load-more.component';
import { PropertiesToolbarComponent } from './properties-toolbar/properties-toolbar.component';
import { PropertiesSearchComponent } from './properties-search/properties-search.component';
import { RatingComponent } from './rating/rating.component';
import { PropertiesSearchResultsFiltersComponent } from './properties-search-results-filters/properties-search-results-filters.component';
import { PropertiesCarouselComponent } from './properties-carousel/properties-carousel.component';
import { MissionComponent } from './mission/mission.component';
import { OurServicesComponent } from './our-services/our-services.component';
import { LogoComponent } from './logo/logo.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { AlertDialogComponent } from './alert-dialog/alert-dialog.component';
import { DialogHeaderControlsComponent } from './dialog-header-controls/dialog-header-controls.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    SwiperModule,
    TranslateModule,
    FlexLayoutModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatStepperModule,
    PerfectScrollbarModule,
    AgmCoreModule,
    AgmSnazzyInfoWindowModule,
    PipesModule,
    DirectivesModule,
  ],
  exports: [
    RouterModule,
    ReactiveFormsModule,
    SwiperModule,
    TranslateModule,
    FlexLayoutModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatStepperModule,
    PerfectScrollbarModule,
    AgmCoreModule,
    AgmSnazzyInfoWindowModule,
    PipesModule,
    DirectivesModule,
    LogoComponent,
    HeaderImageComponent,
    PropertyItemComponent,
    LoadMoreComponent,
    PropertiesToolbarComponent,
    PropertiesSearchComponent,
    RatingComponent,
    PropertiesSearchResultsFiltersComponent,
    PropertiesCarouselComponent,
    MissionComponent,
    OurServicesComponent,
    ConfirmDialogComponent,
    AlertDialogComponent,
    DialogHeaderControlsComponent,
  ],
  declarations: [
    LogoComponent,
    HeaderImageComponent,
    PropertyItemComponent,
    LoadMoreComponent,
    PropertiesToolbarComponent,
    PropertiesSearchComponent,
    RatingComponent,
    PropertiesSearchResultsFiltersComponent,
    PropertiesCarouselComponent,
    MissionComponent,
    OurServicesComponent,
    ConfirmDialogComponent,
    AlertDialogComponent,
    DialogHeaderControlsComponent,
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
  ],
})
export class SharedModule {}
