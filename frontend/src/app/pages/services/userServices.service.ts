import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User, UserReturn } from 'src/app/app.models';
import { TokenService } from 'src/app/shared/autenticacao/token.service';
import jwt_decode from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserServicesService {
  //criamos uma variavel do tipo Subject que é um observable que envia e recebe informaçoes. O BehaviorSubject guarda e envio o estado
  private usuarioSubject = new BehaviorSubject<UserReturn>({});
  urlAPI = environment.urlAPI;
  constructor(private http: HttpClient, private tokenService: TokenService) {
    // caso possua um token esse será atualizado/modificado
    if (this.tokenService.hasToken()) {
      this.decoderJWT();
    }
  }

  createNewUser(newUser: User) {
    return this.http.post(`${this.urlAPI}/user/signup`, newUser);
  }

  newUserExists(newUser: string) {
    return this.http.get(`${this.urlAPI}/user/exists/${newUser}`);
  }

  private decoderJWT() {
    const token = this.tokenService.returnToken();
    const user = jwt_decode(token) as UserReturn;
    // console.log('dadosusuario', user);
    //todos que se inscreverem nesse serviço vao receber os dados do usuário. Essa e a funçao do next
    this.usuarioSubject.next(user);
  }

  returnuser() {
    // enviando como Observable, ninguem de fora da classe pode manipular o estado do BehaviorSubject
    return this.usuarioSubject.asObservable();
  }

  saveToken(token: string) {
    this.tokenService.saveToken(token);
    this.decoderJWT();
  }

  logout() {
    this.tokenService.deleteToken();
    this.usuarioSubject.next({});
  }

  isLoged() {
    return this.tokenService.hasToken();
  }
}
