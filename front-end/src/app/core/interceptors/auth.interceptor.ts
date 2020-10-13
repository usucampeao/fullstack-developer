import { urlsToAvoidInterceptor } from '@env/environment';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '@app/core/services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authenticationService: AuthService, private router: Router) { }

    intercept(request: HttpRequest<any>,
              next: HttpHandler): Observable<HttpEvent<any>> {

        const currentUser: any = this.authenticationService.currentUserValue;

        const avoid = urlsToAvoidInterceptor.some(url => {
            return request.url.includes(url);
        });

        if (currentUser && currentUser.accessToken && !avoid) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentUser.accessToken}`
                }
            });
        }

        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    //console.log('event--->>>', event);
                }
                return event;
            }));

    }

}
