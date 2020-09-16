import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BACKEND_API } from '../../app.api';
import Property from 'src/app/shared/models/property.model';

@Injectable({
  providedIn: 'root'
})
export class PropertiesService {

  constructor(private http: HttpClient) { }

  all(): Observable<Property[]>{
    return this.http.get<Property[]>(`${BACKEND_API}/properties`, {});
  }

  store(property: Property): Observable<Property>{
    return this.http.post<Property>(`${BACKEND_API}/properties`, {
      ...property
    });
  }

  show(id: string): Observable<Property>{
    return this.http.get<Property>(`${BACKEND_API}/properties/${id}`, {});
  }
}
