import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Iavisosytablero } from '../interfaces/avisosytablero.interface';
import { Icontribuyentes } from '../interfaces/contribuyentes.interface';

@Injectable({
  providedIn: 'root'  // Hace que el servicio esté disponible en toda la aplicación
})
export class ContribuyentesService {
  private apiUrl = 'http://127.0.0.1:8000/api';  // URL de la API

  constructor(private http: HttpClient) {}
  getToken(): string | null {
    return localStorage.getItem('token');
  }
  getAvisosytableros(page: number, perPage: number, search: string = ''): Observable<any> {

    const searchParam = search ? `&search=${search}` : '';  // Si hay búsqueda, se añade al query
    return this.http.get<any>(`${this.apiUrl}/contribuyentes?page=${page}&per_page=${perPage}${searchParam}`);
  }
  getContribuyentesById(id: number): Observable<Icontribuyentes> {
    return this.http.get<Icontribuyentes>(`${this.apiUrl}/contribuyentes/${id}`);
  }
  updategetContribuyentes(declaracionanual: Icontribuyentes): Observable<Icontribuyentes> {
    return this.http.put<Icontribuyentes>(`${this.apiUrl}/contribuyentes/${declaracionanual.id}`, declaracionanual); 
  }
  getAllAvisosytableros(): Observable<Iavisosytablero[]> {
    return this.http.get<Iavisosytablero[]>(`${this.apiUrl}/getallavisosytableros`); // El token se agrega automáticamente
  }
  addcontribuyente(declaracionanual: Icontribuyentes): Observable<Icontribuyentes> {
    return this.http.post<Icontribuyentes>(`${this.apiUrl}/contribuyentes`, declaracionanual);
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
  deleteContribuyente(declaracionanualId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/contribuyentes/${declaracionanualId}`, {}); 
  }
  getAllcontribuyente(): Observable<Icontribuyentes[]> {
    return this.http.get<Icontribuyentes[]>(`${this.apiUrl}/getallcontribuyentes`); // Obtiene todos los usuarios sin paginación
  }
  getContribuyenteCount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/contribuyentecount`); // Cambia 'usercount' por la ruta adecuada
  }
  
}
