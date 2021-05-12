import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  public apiURL: string = 'http://localhost:8080';
  private props: Array<any> = [{}, {}, {}];
  private propsStatus: boolean = false;
  private statusLogin = false;

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {
    setTimeout(()=>{
     this.getProps();
    }, 1500)

  }

  getProps() {
    this.http.get(`${this.apiURL}/getImmobiles`)
      .subscribe((resultado: Array<any>) => {
        this.props = resultado;
        this.propsStatus = true;
      });
  }

  getListProps(): Array<any> {
    console.log(this.props);
    return this.props;
  }

  getPropsStatus(): boolean {
    return this.propsStatus;
  }

  showMessage(message, action) {
    this.snackBar.open(message, action);
  }

  getCEPdata(cep: number): string {
      return 'https://viacep.com.br/ws/' +cep + '/json/';
  }

  setStatusLogin(status: boolean) {
    this.statusLogin = status;
  }

  getStatusLogin(): boolean {
    return this.statusLogin;
  }

  getPropsProm(): Promise<any> {
   return new Promise((resolver, reject) => {

      this.http.get(`${this.apiURL}/getImmobiles`)
      .subscribe((resultado: Array<any>) => {
         resolver(resultado);
      });

    });

  }

  updateProp(item: any): Promise<any> {
    return new Promise((resolver, reject) => {

       this.http.put(`${this.apiURL}/updateImmobile`, item)
       .subscribe((resultado: Array<any>) => {
          resolver(resultado);
       }, error => {
          console.log('error', error);
       });

     });

   }

   removeProp(item: any): Promise<any> {
    return new Promise((resolver, reject) => {

       this.http.put(`${this.apiURL}/deleteImmobile`, item)
       .subscribe((resultado: Array<any>) => {
          resolver(resultado);
       }, error => {
          console.log('error', error);
       });

     });

   }

}
