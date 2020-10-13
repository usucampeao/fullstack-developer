import { Imovel } from './../models/imovel.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { api } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class ImovelService {

	constructor(private http: HttpClient) { }

	gravarImovel(imovel: Imovel): Observable<any[]> {
        return this.http.post<any>(`${api.usucampeao}/imovel`, imovel);
    }

    alterarImovel(id: string, imovel: Imovel): Observable<any[]> {
        return this.http.put<any>(`${api.usucampeao}/imovel/${id}`, imovel);
    }
    
    deletarImovel(id: string): Observable<any[]> {
        return this.http.delete<any>(`${api.usucampeao}/imovel/${id}`);
    }

    getImovelById(id: string): Observable<Imovel> {
        return this.http.get<Imovel>(`${api.usucampeao}/imovel/${id}`);
    }

    getAllImoveis(): Observable<Imovel[]> {
        return this.http.get<any>(`${api.usucampeao}/imovel`);
    }

}
