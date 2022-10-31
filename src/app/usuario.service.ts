import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from './usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  //Url que cobtiene el listado de los usuarios en backend
  private baseURL = "http://localhost:8081/api/v1/Usuarios";

  constructor(private httpClient: HttpClient) { }

  //este metodo nos sirve para obtener los empleados
  obtenerListaDeEmpleados(): Observable<Usuario[]> {
    return this.httpClient.get<Usuario[]>(`${this.baseURL}`);
  }
  //este metodo sirve enviando a la url se le envia el objeto que retorna este metodo
  registrarUsuario(usuario: Usuario): Observable<Usuario> {
    return this.httpClient.post<Usuario>(`${this.baseURL}`, usuario);
  }

  actualizarUsuario(id: number, usuario:Usuario): Observable<object> {
    return this.httpClient.put(`${this.baseURL}/${id}`,usuario);
  }
  //este metodo sirve para obtener o buscar un usuario
  obtenerUsuarioPorId(id: number): Observable<Usuario> {
    return this.httpClient.get<Usuario>(`${this.baseURL}/${id}`);
  }

  eliminarUsuario(id: number): Observable<Object> {
    return this.httpClient.delete<Usuario>(`${this.baseURL}/${id}`)
  }


  obtenerporNumerop(id: number): Observable<Usuario> {
    return this.httpClient.get<Usuario>(`${this.baseURL}/numeroPasaporte/${id}`);
  }
}
