import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { InputFileModule } from 'ngx-input-file';
import { AgmCoreModule } from '@agm/core';
import { AccountComponent } from './account.component';

import { MyPropertiesComponent } from './my-properties/my-properties.component';
import { EditPropertyComponent } from './edit-property/edit-property.component';
import { AutenticacaoGuard } from 'src/app/shared/autenticacao/autenticacao.guard';

export const routes = [
  {
    path: '',
    component: AccountComponent,
    children: [
      { path: '', redirectTo: 'my-properties', pathMatch: 'full' },
      { path: 'my-properties', component: MyPropertiesComponent,  canLoad: [AutenticacaoGuard] }, 
      { path: 'my-properties/:id', component: EditPropertyComponent, canLoad: [AutenticacaoGuard] },
    ],
  },
];

@NgModule({
  declarations: [
    AccountComponent,
    MyPropertiesComponent,
    EditPropertyComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    InputFileModule,
    AgmCoreModule,
  ],
})
export class AccountModule {}
