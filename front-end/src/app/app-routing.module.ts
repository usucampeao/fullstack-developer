import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './modules/home/pages/home/home.component';
import { PropertyDetailComponent } from './modules/properties/pages/property-detail/property-detail.component';
import { FavoritesComponent } from './modules/properties/pages/favorites/favorites.component';

import { MainComponent } from './shared/layout/main/main.component';
import { NewPropertyComponent } from './modules/properties/pages/new-property/new-property.component';
import { SearchPropertiesComponent } from './modules/properties/pages/search-properties/search-properties.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: '', component: HomeComponent, data: { title: 'Home' } },
      { path: 'properties/new', component: NewPropertyComponent, data: { title: 'Adicionar imóvel' } },
      { path: 'properties/search', component: SearchPropertiesComponent, data: { title: 'Procurar imóveis' } },
      { path: 'properties/details/:id', component: PropertyDetailComponent, data: { title: 'Detalhes do Imóvel' } },
      { path: 'properties/favorites', component: FavoritesComponent, data: { title: 'Favoritos' } },
    ]
  },

  { path: '**', redirectTo: '/' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
