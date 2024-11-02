import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Iavisosytablero } from '../interfaces/avisosytablero.interface';
import { Ivallas } from '../interfaces/vallas.interface';

@Injectable({
  providedIn: 'root'  // Hace que el servicio esté disponible en toda la aplicación
})
export class VallasService {
  private apiUrl = 'http://127.0.0.1:8000/api';  // URL de la API

  constructor(private http: HttpClient) {}
  getToken(): string | null {
    return localStorage.getItem('token');
  }
  getAvisosytableros(page: number, perPage: number, search: string = ''): Observable<any> {

    const searchParam = search ? `&search=${search}` : '';  // Si hay búsqueda, se añade al query
    return this.http.get<any>(`${this.apiUrl}/vallas?page=${page}&per_page=${perPage}${searchParam}`);
  }
  updategetDeclaraacionAnual(declaracionanual: Ivallas): Observable<Ivallas> {
    return this.http.put<Ivallas>(`${this.apiUrl}/updatdeclaracionanual/${declaracionanual.id}`, declaracionanual); 
  }
  getAllAvisosytableros(): Observable<Iavisosytablero[]> {
    return this.http.get<Iavisosytablero[]>(`${this.apiUrl}/getallavisosytableros`); // El token se agrega automáticamente
  }
  getDeclaraacionAnualById(id: number): Observable<Ivallas> {
    return this.http.get<Ivallas>(`${this.apiUrl}/getdeclaracionanualbyid/${id}`);
  }
  adddeclaracionanual(declaracionanual: Ivallas): Observable<Ivallas> {
    return this.http.post<Ivallas>(`${this.apiUrl}/vallas`, declaracionanual);
  }
  // Método para agregar un usuario
  addUser(user: Iavisosytablero): Observable<Iavisosytablero> {
    return this.http.post<Iavisosytablero>(`${this.apiUrl}/insertusers`, user);
  }
  getUserById(id: number): Observable<Iavisosytablero> {
    return this.http.get<Iavisosytablero>(`${this.apiUrl}/getuserbyId/${id}`);
  }
  updateUser(user: Iavisosytablero): Observable<Iavisosytablero> {
    return this.http.put<Iavisosytablero>(`${this.apiUrl}/updateuser/${user.id}`, user); // Asegúrate de que el endpoint sea correcto
  }
  deleteDeclaraacionAnual(declaracionanualId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/deletedeclaracionanual/${declaracionanualId}/delete`, {}); 
  }
  getAllclaracionanual(): Observable<Iavisosytablero[]> {
    return this.http.get<Iavisosytablero[]>(`${this.apiUrl}/getallclaracionanual`); // Obtiene todos los usuarios sin paginación
  }
  
}
