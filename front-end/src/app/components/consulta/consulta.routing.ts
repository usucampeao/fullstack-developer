import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from '@app/shared/shared.module';
// Components
import { ConsultaImoveisComponent } from '@app/components/consulta/index';

export const consultaRouting: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                redirectTo: 'imoveis',
                pathMatch: 'full'
            },
            {
                path: 'imoveis',
                component: ConsultaImoveisComponent
            }
        ]
    }
];

@NgModule({
    declarations: [
        ConsultaImoveisComponent,
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(consultaRouting)
    ],
    exports: [RouterModule]
})
export class ConsultaRoutingModule { }
