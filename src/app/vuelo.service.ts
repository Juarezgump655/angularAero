import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vuelo, vueloconsulta, vueloPasajeros, vuelotable } from './vuelo';

@Injectable({
  providedIn: 'root'
})
export class VueloService {
  private baseURL = "http://localhost:8081/api/v9/Vuelos";
  constructor(private httpClient: HttpClient) { }

  obtenerListavuelos(): Observable<vuelotable[]> {
    return this.httpClient.get<vuelotable[]>(`${this.baseURL}`);
  }
  obtenerListavuelosFiltro(fecha:string, id:number): Observable<vuelotable[]> {
    return this.httpClient.get<vuelotable[]>(`${this.baseURL}/${fecha}/${id}`);
  }

  registrarVuelo(vuelo:Vuelo): Observable<Vuelo> {
    return this.httpClient.post<Vuelo>(`${this.baseURL}`, vuelo);
  }

  obtenerVueloporID(id:number): Observable<vuelotable> {
    return this.httpClient.get<vuelotable>(`${this.baseURL}/${id}`);
  }

  obtenerPasajerosID(id:number): Observable<vueloPasajeros[]> {
    return this.httpClient.get<vueloPasajeros[]>(`${this.baseURL}/pasajeros/${id}`);
  }


  obtenerVuelos(fechadesde:string, fechahasta:string, horadesde:string, horahasta:string ): Observable<vueloconsulta[]> {
    return this.httpClient.get<vueloconsulta[]>(`${this.baseURL}/${fechadesde}/${fechahasta}/${horadesde}/${horahasta}`);
  }

}
