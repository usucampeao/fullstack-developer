import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';

import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularMaterialModule } from './shared/angular-material.module';

import { HeaderComponent } from './shared/layout/header/header.component';
import { MainComponent } from './shared/layout/main/main.component';
import { HomeComponent } from './modules/home/pages/home/home.component';
import { PropertyCardComponent } from './modules/properties/components/property-card/property-card.component';
import { PropertyDetailComponent } from './modules/properties/pages/property-detail/property-detail.component';
import { FavoritesComponent } from './modules/properties/pages/favorites/favorites.component';
import { NewPropertyComponent } from './modules/properties/pages/new-property/new-property.component';
import { SearchPropertiesComponent } from './modules/properties/pages/search-properties/search-properties.component';

registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    HomeComponent,
    PropertyCardComponent,
    PropertyDetailComponent,
    FavoritesComponent,
    NewPropertyComponent,
    SearchPropertiesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    AngularMaterialModule,
  ],
  providers: [{provide: LOCALE_ID, useValue: 'pt-BR'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
