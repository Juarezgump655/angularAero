import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Administrador } from './administrador';

@Injectable({
  providedIn: 'root'
})
export class AdministradorService {
  private baseURL = "http://localhost:8081/api/v5/Admin";
  constructor(private httpClient:HttpClient) { }

  obtenerAdministradorPorId(id: number): Observable<Administrador> {
    return this.httpClient.get<Administrador>(`${this.baseURL}/${id}`);
  }

}




