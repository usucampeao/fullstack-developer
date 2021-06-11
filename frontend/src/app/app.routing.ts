import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules  } from '@angular/router'; 

import { PagesComponent } from './pages/pages.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AutenticacaoGuard } from './shared/autenticacao/autenticacao.guard';


export const routes: Routes = [
    { 
        path: '', 
        component: PagesComponent, children: [
            { path: '', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
            { path: 'about', loadChildren: () => import('./pages/about/about.module').then(m => m.AboutModule) },
            { path: 'properties', loadChildren: () => import('./pages/property/properties.module').then(m => m.PropertiesModule) },
            { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },
            { path: 'register', loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterModule) },
            { path: 'account', loadChildren: () => import('./pages/account/account.module').then(m => m.AccountModule) }, 
            { path: 'submit-property', loadChildren: () => import('./pages/submit-property/submit-property.module').then(m => m.SubmitPropertyModule), 
              canLoad: [AutenticacaoGuard]
        }   
        ]
    },
    { path: '**', component: NotFoundComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            preloadingStrategy: PreloadAllModules, // <- comment this line for activate lazy load
            relativeLinkResolution: 'legacy',
            initialNavigation: 'enabled', // for one load page, without reload
            // useHash: true
        })
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }