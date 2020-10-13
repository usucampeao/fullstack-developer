import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

// App modules
import { SharedModule } from '@app/shared/shared.module';

// App component
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { LoginComponent } from './components/login/login.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';


@NgModule({
	declarations: [
		AppComponent,
		SpinnerComponent,
		LoginComponent
	],
	imports: [
		// Angular
		BrowserModule,
		BrowserAnimationsModule,
		// Routing
		AppRoutingModule,
		// App modules
		SharedModule,
	],
	providers: [
		{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
