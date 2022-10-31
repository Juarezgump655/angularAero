import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Avion } from './avion';

@Injectable({
  providedIn: 'root'
})
export class AvionService {
  private baseURL = "http://localhost:8081/api/v7/Avion";
  constructor(private httpClient: HttpClient) { }

  registrarAvion( avion: Avion): Observable<Avion> {
    return this.httpClient.post<Avion>(`${this.baseURL}`, avion);
  }

  obtenerAvionId(id: number): Observable<Avion> {
    return this.httpClient.get<Avion>(`${this.baseURL}/${id}`);
  }


  obtenerListaDeAeropuerto(): Observable<Avion[]> {
    return this.httpClient.get<Avion[]>(`${this.baseURL}`);
  }

  actualizarAvion(idaero: number,id: number, avion:Avion): Observable<object> {
    return this.httpClient.put(`${this.baseURL}/${idaero}/${id}`,avion);
  }

  obtenerAvionAerolinea(idaero:number, id:number): Observable<Avion[]> {
    return this.httpClient.get<Avion[]>(`${this.baseURL}/reporte/${idaero}/${id}`);
  }

  obtenerAvionAerolineac(idaero:number, id:number): Observable<Avion[]> {
    return this.httpClient.get<Avion[]>(`${this.baseURL}/${idaero}/${id}`);
  }





}
