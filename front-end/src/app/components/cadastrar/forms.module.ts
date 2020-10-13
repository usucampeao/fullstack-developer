import { NgModule } from '@angular/core';

import { FormsRoutingModule } from './forms.routing';

import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
    imports: [
        FormsRoutingModule,
        MatFormFieldModule
    ]
})
export class FormsModule { }
