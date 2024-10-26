import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Iavisosytablero } from '../interfaces/avisosytablero.interface';

@Injectable({
  providedIn: 'root'  // Hace que el servicio esté disponible en toda la aplicación
})
export class DeclaracionAnualService {
  private apiUrl = 'http://127.0.0.1:8000/api';  // URL de la API

  constructor(private http: HttpClient) {}
  getToken(): string | null {
    return localStorage.getItem('token');
  }
  getUsers(page: number, perPage: number, search: string = ''): Observable<any> {

    const searchParam = search ? `&search=${search}` : '';  // Si hay búsqueda, se añade al query
    return this.http.get<any>(`${this.apiUrl}/alluser?page=${page}&per_page=${perPage}${searchParam}`);
  }
  getAllUsers(): Observable<Iavisosytablero[]> {
    return this.http.get<Iavisosytablero[]>(`${this.apiUrl}/getallusers`); // Obtiene todos los usuarios sin paginación
  }
  
  // Método para agregar un usuario
  adddeclaracionanual(declaracionanual: Iavisosytablero): Observable<Iavisosytablero> {
    return this.http.post<Iavisosytablero>(`${this.apiUrl}/insertdeclaracionanual`, declaracionanual);
  }
  getDeclaraacionAnualById(id: number): Observable<Iavisosytablero> {
    return this.http.get<Iavisosytablero>(`${this.apiUrl}/getdeclaracionanualbyid/${id}`);
  }
  updategetDeclaraacionAnual(declaracionanual: Iavisosytablero): Observable<Iavisosytablero> {
    return this.http.put<Iavisosytablero>(`${this.apiUrl}/updatdeclaracionanual/${declaracionanual.id}`, declaracionanual); // Asegúrate de que el endpoint sea correcto
  }
  
}
