import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AgmCoreModule } from '@agm/core';  
import { SharedModule } from '../../shared/shared.module';
import { PropertyComponent } from './property.component';

export const routes = [
  { path: ':id', component: PropertyComponent }
];

@NgModule({
  declarations: [

    PropertyComponent
  ],

  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AgmCoreModule,
    SharedModule
  ]
})
export class PropertiesModule { }
