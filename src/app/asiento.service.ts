import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Asiento, asientos } from './asiento';

@Injectable({
  providedIn: 'root'
})
export class AsientoService {
  private baseURL = "http://localhost:8081/api/vA/Asiento";
  constructor(private httpClient: HttpClient) { 

  }

  crearasientos(asientos:number, id?:number, asiento?:Asiento): Observable<Asiento> {
    return this.httpClient.post<Asiento>(`${this.baseURL}/${asientos}/${id}`, asiento);
  }


  traerAsientosA(id:number): Observable<asientos[]>{
    return this.httpClient.get<asientos[]>(`${this.baseURL}/${id}`);
  }


  reservarAsiento(iduser:number,id:number): Observable<asientos>{
    return this.httpClient.get<asientos>(`${this.baseURL}/reservar/${iduser}/${id}`);
  }

  
}
