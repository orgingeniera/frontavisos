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
  getUsers(page: number, perPage: number, search: string = ''): Observable<any> {

    const searchParam = search ? `&search=${search}` : '';  // Si hay búsqueda, se añade al query
    return this.http.get<any>(`${this.apiUrl}/alluser?page=${page}&per_page=${perPage}${searchParam}`, { headers: this.autService.getHeaders() });
  }
  getAllUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${this.apiUrl}/getallusers`,{ headers: this.autService.getHeaders() }); // Obtiene todos los usuarios sin paginación
  }
  
  // Método para agregar un usuario
  addUser(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(`${this.apiUrl}/insertusers`, user,{ headers: this.autService.getHeaders() });
  }
  getUserById(id: number): Observable<IUser> {
    return this.http.get<IUser>(`${this.apiUrl}/getuserbyId/${id}`,{ headers: this.autService.getHeaders() });
  }
  updateUser(user: IUser): Observable<IUser> {
    return this.http.put<IUser>(`${this.apiUrl}/updateuser/${user.id}`, user,{ headers: this.autService.getHeaders() }); // Asegúrate de que el endpoint sea correcto
  }
  
}
