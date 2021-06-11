import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserServicesService } from 'src/app/pages/services/userServices.service';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoGuard implements CanLoad {

  constructor(private usuarioService: UserServicesService, private router: Router){}
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(!this.usuarioService.isLoged()) {
        this.router.navigate(['']); 
        return false
      }
      
       return true;
  }
}
