import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { first, map, switchMap } from 'rxjs/operators';
import { UserServicesService } from '../services/userServices.service';

@Injectable({
  providedIn: 'root',
})
export class UserExistsService {
  constructor(private newUser: UserServicesService) {}

  userExists() {
    return (control: AbstractControl) => {
      // recebemos os dados digitados no formulario e alternamos o fluxo para uma requisiçao no servidor (switchMap)
      return control.valueChanges.pipe(
        switchMap((userName) => this.newUser.newUserExists(userName)),
        // o map vai receber o resultado da consulta no backend e retorna o resultado  a aplicaçao
        map((userFound) => (userFound ? { usuarioExistente: true } : null)),
        // para encerrarmos o obsrvable apos a constulta usamos o first()
        first()
      );
    };
  }
}
