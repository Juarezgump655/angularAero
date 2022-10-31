import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tablaRoles, tablaUsuarios, Usuariosinternos } from './usuariosinternos';

@Injectable({
  providedIn: 'root'
})
export class UsuariosinternosService {
  //Url que cobtiene el listado de los usuarios Internos en backend
  private baseURL = "http://localhost:8081/api/v2/UsuariosInternos";
  constructor(private httpClient: HttpClient) { }

  //este metodo nos sirve para obtener los usuarios Internos
  obtenerListaDeUsuariosinternos(): Observable<tablaUsuarios[]> {
    return this.httpClient.get<tablaUsuarios[]>(`${this.baseURL}`);
  }

  obtenerListaPilotos(idaero:number, idpuerto:number): Observable<Usuariosinternos[]> {
    return this.httpClient.get<Usuariosinternos[]>(`${this.baseURL}/pilotos/${idaero}/${idpuerto}`);
  }

  obtenerListaCoPilotos(idaero:number, idpuerto:number): Observable<Usuariosinternos[]> {
    return this.httpClient.get<Usuariosinternos[]>(`${this.baseURL}/copilotos/${idaero}/${idpuerto}`);
  }

  obtenerListaInges(idaero:number, idpuerto:number): Observable<Usuariosinternos[]> {
    return this.httpClient.get<Usuariosinternos[]>(`${this.baseURL}/ingenieros/${idaero}/${idpuerto}`);
  }

  obtenerListaTripulantes(idaero:number, idpuerto:number): Observable<Usuariosinternos[]> {
    return this.httpClient.get<Usuariosinternos[]>(`${this.baseURL}/tripulantes/${idaero}/${idpuerto}`);
  }

  obtenerUsuariosFiltro(nombre:string, idaero:number, idaerolinea:number): Observable<tablaUsuarios[]> {
    console.log((`${this.baseURL}/filtro/${nombre}/${idaero}/${idaerolinea}`));
    return this.httpClient.get<tablaUsuarios[]>(`${this.baseURL}/filtro/${nombre}/${idaero}/${idaerolinea}`);

  }


  obtenerListaDeRoles(): Observable<tablaRoles[]> {
    return this.httpClient.get<tablaRoles[]>(`${this.baseURL}/rol`);
  }
  
  //este metodo sirve enviando a la url se le envia el objeto que retorna este metodo
  registrarUsuariosinternos(usuariosinternos: Usuariosinternos): Observable<Usuariosinternos> {
    return this.httpClient.post<Usuariosinternos>(`${this.baseURL}`, usuariosinternos);
  }

  actualizarUsuariosinternos(idaero:number, id: number, usuariosinternos:Usuariosinternos): Observable<object> {
    return this.httpClient.put(`${this.baseURL}/${idaero}/${id}`,usuariosinternos);
  }
  //este metodo sirve para obtener o buscar un usuario
  obtenerUsuariosinternosPorId(id: number): Observable<Usuariosinternos> {
    return this.httpClient.get<Usuariosinternos>(`${this.baseURL}/${id}`);
  }
  eliminarUsuariosinternos(id: number): Observable<Object> {
    return this.httpClient.delete<Usuariosinternos>(`${this.baseURL}/${id}`)
  }
  iniciarSesionUsuariosinternos(id: number): Observable<Usuariosinternos> {
    return this.httpClient.get<Usuariosinternos>(`${this.baseURL}/inicio-sesion/${id}`);
  }


}
