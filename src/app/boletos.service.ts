import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { boletopdf, Boletos, maletas } from './boletos';

@Injectable({
  providedIn: 'root'
})
export class BoletosService {
  private baseURL = "http://localhost:8081/api/b1/boletos";
  constructor(private httpClient: HttpClient) { }

  crearBoleto(boletos?:Boletos): Observable<Boletos> {
    return this.httpClient.post<Boletos>(`${this.baseURL}`, boletos);
  }

  findById(id:number): Observable<boletopdf> {
    return this.httpClient.get<boletopdf>(`${this.baseURL}/${id}`);
  }
  
  maletas(idvuelo:number, idaero:number): Observable<maletas[]>{
    return this.httpClient.get<maletas[]>(`${this.baseURL}/${idvuelo}/${idaero}`);
  }

}
