import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tripulacion, tripulaciontable } from './tripulacion';

@Injectable({
  providedIn: 'root'
})
export class TripulacionService {
  private baseURL = "http://localhost:8081/api/v6/Tripulacion";
  constructor(private httpClient: HttpClient) { }

  obtenerListaDeTripulacion(id:number): Observable<Tripulacion[]> {
    return this.httpClient.get<Tripulacion[]>(`${this.baseURL}/aeropuerto/${id}`);
  }

  obtenerTripulacionPorId(id: number): Observable<Tripulacion> {
    return this.httpClient.get<Tripulacion>(`${this.baseURL}/${id}`);
  }

  eliminarAeropuerto(id: number): Observable<Object> {
    return this.httpClient.delete<Tripulacion>(`${this.baseURL}/${id}`)
  }

  registrarTripulacion(idcreador: number, tripulacion: Tripulacion): Observable<Tripulacion> {
    return this.httpClient.post<Tripulacion>(`${this.baseURL}/${idcreador}`, tripulacion);
  }

  traerTable(id: number): Observable<tripulaciontable[]>{
      return this.httpClient.get<tripulaciontable[]>(`${this.baseURL}/tableaero/${id}`);
  }
  

}
