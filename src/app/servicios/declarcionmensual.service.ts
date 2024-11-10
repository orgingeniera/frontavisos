import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ideclaracionmensual } from '../interfaces/declaracionmensualinterface';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'  // Hace que el servicio esté disponible en toda la aplicación
})
export class DeclaracionMensualService {
  private apiUrl = environment.apiUrl;  // URL de la API

  constructor(private http: HttpClient) {}
  getToken(): string | null {
    return localStorage.getItem('token');
  }
  getDeclaracionMensual(page: number, perPage: number, search: string = ''): Observable<any> {

    const searchParam = search ? `&search=${search}` : '';  // Si hay búsqueda, se añade al query
    return this.http.get<any>(`${this.apiUrl}/alldeclaracionmensual?page=${page}&per_page=${perPage}${searchParam}`);
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
  deleteDeclaraacionMensual(declaracionmensualId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/deletedeclaracionmensual/${declaracionmensualId}/delete`, {}); 
  }
  getAllclaracionanual(): Observable<Ideclaracionmensual[]> {
    return this.http.get<Ideclaracionmensual[]>(`${this.apiUrl}/getallclaracionanual`); // Obtiene todos los usuarios sin paginación
  }
  getDeclaraacionMensualById(id: number): Observable<Ideclaracionmensual> {
    return this.http.get<Ideclaracionmensual>(`${this.apiUrl}/getdeclaracionmensualbyid/${id}`);
  }
  updategetDeclaraacionMensual(declaracionmensual: Ideclaracionmensual): Observable<Ideclaracionmensual> {
    return this.http.put<Ideclaracionmensual>(`${this.apiUrl}/updatdeclaracionmensual/${declaracionmensual.id}`, declaracionmensual); 
  }
  adddeclaracionmensual(declaracionmensual: Ideclaracionmensual): Observable<Ideclaracionmensual> {
    return this.http.post<Ideclaracionmensual>(`${this.apiUrl}/insertdeclaracionmensual`, declaracionmensual);
  }
  getAllDeclaracionAnualByNit(nit_contribuyente: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getAlldeclaracionanualbynit/${nit_contribuyente}`);
  }
  
}
