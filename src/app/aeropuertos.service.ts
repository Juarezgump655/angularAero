import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Aeropuertos, ciudad, direccion, listaAeropuertos } from './aeropuertos';

@Injectable({
  providedIn: 'root'
})
export class AeropuertosService {
  //Url que cobtiene el listado de los usuarios Internos en backend
  private baseURL = "http://localhost:8081/api/v4/Aeropuerto";
  constructor(private httpClient: HttpClient) { }

//este metodo nos sirve para obtener los empleados
obtenerListaDeAeropuerto(): Observable<Aeropuertos[]> {
  return this.httpClient.get<Aeropuertos[]>(`${this.baseURL}`);
}

obtenerfiltroid(id: number): Observable<Aeropuertos[]> {
  return this.httpClient.get<Aeropuertos[]>(`${this.baseURL}/filtro/${id}`);
}

obtenerfiltro(nombre: string, direccion: string): Observable<Aeropuertos[]> {
  return this.httpClient.get<Aeropuertos[]>(`${this.baseURL}/filtro/${nombre}/${direccion}`);
}

//este metodo sirve enviando a la url se le envia el objeto que retorna este metodo
registrarAeropuerto(aeropuertos: Aeropuertos): Observable<Aeropuertos> {
  return this.httpClient.post<Aeropuertos>(`${this.baseURL}`, aeropuertos);
}

traerDireccion(id: number): Observable<direccion[]> {
  return this.httpClient.get<direccion[]>(`${this.baseURL}/direccion/${id}`);
}

traerAeropuertoConsu(id: number): Observable<Aeropuertos[]> {
  return this.httpClient.get<Aeropuertos[]>(`${this.baseURL}/consultas/${id}`);
}

traerCiudades(): Observable<ciudad[]> {
  return this.httpClient.get<ciudad[]>(`${this.baseURL}/ciudadades`);
}


actualizarAeropuerto(idaero: number,id: number, aeropuertos:Aeropuertos): Observable<object> {
  return this.httpClient.put(`${this.baseURL}/${idaero}/${id}`,aeropuertos);
}
//este metodo sirve para obtener o buscar un usuario
obtenerAeropuertoPorId(id: number): Observable<Aeropuertos> {
  return this.httpClient.get<Aeropuertos>(`${this.baseURL}/${id}`);
}
eliminarAeropuerto(id: number): Observable<Object> {
  return this.httpClient.delete<Aeropuertos>(`${this.baseURL}/${id}`)
}
obtenerListaDeAeropuertos(): Observable<listaAeropuertos[]> {
  return this.httpClient.get<listaAeropuertos[]>(`${this.baseURL}/list`);
}


}
