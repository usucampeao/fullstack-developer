import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Layouts
import { MainLayoutComponent } from '@app/shared/layouts/index';
import { AuthLayoutComponent } from '@app/shared/layouts/index';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './core/services/auth.guard';

const routes: Routes = [
    {
        path: '',
        component: AuthLayoutComponent,
        children: [
            {
                path: '',
                redirectTo: '/login',
                pathMatch: 'full'
            },
            {
                path: 'login',
                component: LoginComponent
            },
        ]
    },
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            // Default
            {
                path: '',
                redirectTo: 'login',
                pathMatch: 'full'
            },
            {
                path: 'consulta',
                canActivate: [AuthGuard],
                loadChildren: './components/consulta/consulta.module#ConsultaModule'
            },
            {
                path: 'cadastrar',
                loadChildren: './components/cadastrar/forms.module#FormsModule'
            }
        ]
    },
    {
        path: '**',
        redirectTo: '/login'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { relativeLinkResolution: "legacy" })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
