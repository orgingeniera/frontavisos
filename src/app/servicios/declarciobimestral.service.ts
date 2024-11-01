import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ideclaracionmensual } from '../interfaces/declaracionmensualinterface';

@Injectable({
  providedIn: 'root'  // Hace que el servicio esté disponible en toda la aplicación
})
export class DeclaracionBimestralService {
  private apiUrl = 'http://127.0.0.1:8000/api';  // URL de la API

  constructor(private http: HttpClient) {}
  getToken(): string | null {
    return localStorage.getItem('token');
  }
  getDeclaracionBimestral(page: number, perPage: number, search: string = ''): Observable<any> {

    const searchParam = search ? `&search=${search}` : '';  // Si hay búsqueda, se añade al query
    return this.http.get<any>(`${this.apiUrl}/alldeclaracionbimestral?page=${page}&per_page=${perPage}${searchParam}`);
  }
  
  getAlldeclaracionmensualcontroller(): Observable<Ideclaracionmensual[]> {
    return this.http.get<Ideclaracionmensual[]>(`${this.apiUrl}/declaracionmensualcontroller`); // El token se agrega automáticamente
  }
  // Método para agregar un usuario
  addUser(user: Ideclaracionmensual): Observable<Ideclaracionmensual> {
    return this.http.post<Ideclaracionmensual>(`${this.apiUrl}/insertusers`, user);
  }
  getUserById(id: number): Observable<Ideclaracionmensual> {
    return this.http.get<Ideclaracionmensual>(`${this.apiUrl}/getuserbyId/${id}`);
  }
  updateUser(user: Ideclaracionmensual): Observable<Ideclaracionmensual> {
    return this.http.put<Ideclaracionmensual>(`${this.apiUrl}/updateuser/${user.id}`, user); // Asegúrate de que el endpoint sea correcto
  }
  deletedeclaracionBimestral(declaracionmensualId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/deletedeclaracionbimestral/${declaracionmensualId}/delete`, {}); 
  }
  getAllclaracionbimestral(): Observable<Ideclaracionmensual[]> {
    return this.http.get<Ideclaracionmensual[]>(`${this.apiUrl}/getallclaracionbimestral`); // Obtiene todos los usuarios sin paginación
  }
  getDeclaraacionBimestralById(id: number): Observable<Ideclaracionmensual> {
    return this.http.get<Ideclaracionmensual>(`${this.apiUrl}/getdeclaracionbimestralbyid/${id}`);
  }
  updategetDeclaraacionBimestral(declaracionmensual: Ideclaracionmensual): Observable<Ideclaracionmensual> {
    return this.http.put<Ideclaracionmensual>(`${this.apiUrl}/updatdeclaracionbimestral/${declaracionmensual.id}`, declaracionmensual); 
  }
  adddeclaracionbimestral(declaracionmensual: Ideclaracionmensual): Observable<Ideclaracionmensual> {
    return this.http.post<Ideclaracionmensual>(`${this.apiUrl}/insertdeclaracionbimestral`, declaracionmensual);
  }
  getAllDeclaracionBimestralByNit(nit_contribuyente: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getAlldeclaracionbimestralbynit/${nit_contribuyente}`);
  }
  
}
