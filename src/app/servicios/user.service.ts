import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AutService } from './aut.service';


@Injectable({
  providedIn: 'root'  // Hace que el servicio esté disponible en toda la aplicación
})
export class UserService {
  private apiUrl = 'http://127.0.0.1:8000/api';  // URL de la API

  constructor(private http: HttpClient, private autService:AutService) {}
  getToken(): string | null {
    return localStorage.getItem('token');
  }
  getUsers(page: number, perPage: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/alluser?page=${page}&per_page=${perPage}`, { headers: this.autService.getHeaders() });
  }
}
