import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserServicesService } from 'src/app/pages/services/userServices.service';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root',
})
export class AutenticacaoService {
  apiUrl = environment.urlAPI
  constructor(private httpClient: HttpClient, private userService: UserServicesService) {}

  auth(usuario: string, senha: string): Observable<HttpResponse<any>>{
    // esse observable é do tipo HTTResponse, pois precisamos pegar o header que a api nos retorna 
    return this.httpClient.post(`${this.apiUrl}/user/login`, 
    {
      userName: usuario,
      password: senha,
    }, 
    {observe: 'response'}
    
    ).pipe(
      tap((res) => {
        const authToken = res.headers.get('x-access-token')  ?? ''
        this.userService.saveToken(authToken);
      })
    )
  }
}
