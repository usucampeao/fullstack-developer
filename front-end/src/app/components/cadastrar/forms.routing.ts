import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from '@app/shared/shared.module';
// Components
import { CadastrarImovelComponent } from '@app/components/cadastrar/index';

export const formsRouting: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                redirectTo: 'imovel',
                pathMatch: 'full'
            },
            {
                path: 'imovel',
                component: CadastrarImovelComponent,
            },
            {
                path: 'imovel/:id',
                component: CadastrarImovelComponent,
            },
        ]
    }
];

@NgModule({
    declarations: [
        CadastrarImovelComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(formsRouting)
    ],
    exports: [RouterModule]
})
export class FormsRoutingModule { }
