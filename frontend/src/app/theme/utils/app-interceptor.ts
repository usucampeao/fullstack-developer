import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { TokenService } from 'src/app/shared/autenticacao/token.service';

@Injectable()
export class AppInterceptor implements HttpInterceptor {
    constructor(private tokenService: TokenService) {}
  
    intercept (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

      if(this.tokenService.hasToken()){
        const token = this.tokenService.returnToken();
        const headers = new HttpHeaders().append('x-access-token', token);
        req = req.clone({headers});

      }


        return next.handle(req).pipe(map((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
              // console.log(`Request for ${req.urlWithParams} completed...`);
            }
            return event;
          }),
          catchError((error: HttpErrorResponse) => {
            const started = Date.now();            
            const elapsed = Date.now() - started;
            console.log(`A Requisiçao para  ${req.urlWithParams} falhou após ${elapsed} ms.`);
           // debugger;
            return throwError(error);
          })
        );

    }  
}