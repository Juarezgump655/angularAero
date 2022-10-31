import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Aerolinea, listaAerolinea, listaAerolineas } from './aerolinea';

@Injectable({
  providedIn: 'root'
})
export class AerolineaService {

   //Url que cobtiene el listado de los usuarios Internos en backend
   private baseURL = "http://localhost:8081/api/v3/Aerolineas";
   constructor(private httpClient: HttpClient) { }
 
 //este metodo nos sirve para obtener los empleados
 obtenerListaDeAerolineas(): Observable<listaAerolineas[]> {
   return this.httpClient.get<listaAerolineas[]>(`${this.baseURL}`);
 }

 consultaAerolineas(idaero:number, id:number): Observable<Aerolinea[]> {
  return this.httpClient.get<Aerolinea[]>(`${this.baseURL}/consultas/${idaero}/${id}`);
}
 //este metodo sirve enviando a la url se le envia el objeto que retorna este metodo
 registrarAerolinea(aerolinea: Aerolinea): Observable<Aerolinea> {
   return this.httpClient.post<Aerolinea>(`${this.baseURL}`, aerolinea);
 }
 
 actualizarAerolinea(idaero:number, id: number, aerolinea:Aerolinea): Observable<object> {
   return this.httpClient.put(`${this.baseURL}/${idaero}/${id}`,aerolinea);
 }
 //este metodo sirve para obtener o buscar un usuario
 obtenerAerolineaPorId(id: number): Observable<Aerolinea> {
   return this.httpClient.get<Aerolinea>(`${this.baseURL}/${id}`);
 }
 obtenerAerolineaid(id: number): Observable<listaAerolineas[]> {
  return this.httpClient.get<listaAerolineas[]>(`${this.baseURL}/filtro/${id}`);
}

obtenerAerolineafiltro(nombre: string,id: number): Observable<listaAerolineas[]> {
  return this.httpClient.get<listaAerolineas[]>(`${this.baseURL}/filtro/${nombre}/${id}`);
}

 eliminarAerolinea(id: number): Observable<Object> {
   return this.httpClient.delete<Aerolinea>(`${this.baseURL}/${id}`)
 }

 obtenerAerolineas(): Observable<listaAerolinea[]> {
  return this.httpClient.get<listaAerolinea[]>(`${this.baseURL}/list`);
}
 
 
 
}
