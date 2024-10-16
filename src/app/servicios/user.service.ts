import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AutService } from './aut.service';
import { IUser } from '../interfaces/user.interface';

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
  getAllUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${this.apiUrl}/getallusers`,{ headers: this.autService.getHeaders() }); // Obtiene todos los usuarios sin paginación
  }
  // Método para agregar un usuario
  addUser(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(`${this.apiUrl}/insertusers`, user,{ headers: this.autService.getHeaders() });
  }
}
