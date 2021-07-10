import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Address } from '../model/address.model';
import { Immobile } from '../model/immobile.model';
import { ResponseRequest } from '../model/responseRequest.model';

@Injectable({
  providedIn: 'root'
})
export class ImmobileService {

  apiUrl = 'http://localhost:3333/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private httpClient: HttpClient
  ) { }

  public getSearchAddress(zipCode: any): Observable<Address> {
    return this.httpClient.get<Address>(`${this.apiUrl}search/zipcode/${zipCode}`)
  }

  public getListImmobiles(page: number, limit: number): Observable<ResponseRequest> {
    return this.httpClient.get<ResponseRequest>(this.apiUrl + `list/${page}/${limit}`)
  }

  public postImmobiles(immobile: any): Observable<Immobile> {
    return this.httpClient.post<Immobile>(`${this.apiUrl}`, immobile, this.httpOptions);
  }

  public postFetchImmobiles(query: any): Observable<ResponseRequest> {
    return this.httpClient.post<ResponseRequest>(`${this.apiUrl}fetch`, query, this.httpOptions);
  }

  public putImmobiles(id: number, immobile: any): Observable<Immobile> {
    return this.httpClient.put<Immobile>(`${this.apiUrl}${id}`, immobile, this.httpOptions);
  }

  public deleteImmobile(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.apiUrl}${id}`, this.httpOptions);
  }

}
