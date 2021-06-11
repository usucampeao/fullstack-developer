import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';

import { NgProgressModule } from 'ngx-progressbar';
import { NgProgressHttpModule } from 'ngx-progressbar/http';
import { InputFileConfig, InputFileModule } from 'ngx-input-file';
const config: InputFileConfig = {
  fileAccept: '*',
};

import { environment } from 'src/environments/environment';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(
    httpClient,
    environment.url + '/assets/i18n/',
    '.json'
  );
}

import { OverlayContainer } from '@angular/cdk/overlay';
import { CustomOverlayContainer } from './theme/utils/custom-overlay-container';

import { AppRoutingModule } from './app.routing';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { AppSettings } from './app.settings';
import { AppInterceptor } from './theme/utils/app-interceptor';

import { PagesComponent } from './pages/pages.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { Toolbar1Component } from './theme/components/toolbar1/toolbar1.component';
import { UserMenuComponent } from './theme/components/user-menu/user-menu.component';
import { LangComponent } from './theme/components/lang/lang.component';
import { SocialIconsComponent } from './theme/components/social-icons/social-icons.component';
import { ContactsComponent } from './theme/components/contacts/contacts.component';
import { HorizontalMenuComponent } from './theme/components/menu/horizontal-menu/horizontal-menu.component';
import { FooterComponent } from './theme/components/footer/footer.component';
import { AgmCoreModule } from '@agm/core';




@NgModule({
  declarations: [
    AppComponent,
    PagesComponent,
    NotFoundComponent,
    UserMenuComponent,
    LangComponent,
    SocialIconsComponent,
    ContactsComponent,
    Toolbar1Component,
    HorizontalMenuComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA5_n8vURpz4afXX0MILbZ9S2ilhPBs8SM',
      libraries: ['places'],
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    NgProgressModule,
    NgProgressHttpModule,
    InputFileModule.forRoot(config),
    AppRoutingModule,
    SharedModule,
  ],
  providers: [
    AppSettings,
    { provide: OverlayContainer, useClass: CustomOverlayContainer },
    { provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
