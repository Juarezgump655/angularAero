import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Puerta } from './puerta';

@Injectable({
  providedIn: 'root'
})
export class PuertaService {
  private baseURL = "http://localhost:8081/api/v10/Puerta";

  constructor(private httpClient: HttpClient) { }

  crearPuerta(puertas:number, id?:number, puerta?:Puerta): Observable<Puerta> {
    return this.httpClient.post<Puerta>(`${this.baseURL}/${puertas}/${id}`, puerta);
  }


    
  obtenerPuertas(id: number){
    return this.httpClient.get<Puerta[]>(`${this.baseURL}/${id}`);
  }


}
