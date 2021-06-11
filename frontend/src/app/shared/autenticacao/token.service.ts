import { Injectable } from '@angular/core';

const KEY = 'token'; 

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  returnToken(){
    return localStorage.getItem(KEY) ?? ''
  }
  
  saveToken(token: string){
    localStorage.setItem(KEY, token); 
  }

  deleteToken() {
    localStorage.removeItem(KEY);
  }
  hasToken(){
    //retorna um booleano se existir ou nao o token 
    return !!this.returnToken();
  }
    
}
