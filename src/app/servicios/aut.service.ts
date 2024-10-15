import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutService {

  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) { }

  login(credentials: { email: string, password: string }): Observable<any> {
     return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  // Guardar token en el LocalStorage
  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
   getHeaders(): HttpHeaders {
    const token = this.getToken(); // Obtén el token del LocalStorage
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`, // Agrega el token en los headers
    });
  }
 // Método para cerrar sesión
 logout(): Observable<any> {
  localStorage.removeItem('token');
  return this.http.post(`${this.apiUrl}/logout`, {}, { headers: this.getHeaders() }); // Envío de la solicitud

}


}
