import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AutService {

  private apiUrl = environment.apiUrl;
  private token: string | null = null;
  constructor(private http: HttpClient, private router: Router) { }

  login(credentials: { email: string, password: string }): Observable<any> {
     return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  // Guardar token en el LocalStorage
  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string {
    return this.token || localStorage.getItem('token') || ''; // Devuelve una cadena vacía si no hay token
  }
   
 // Método para cerrar sesión
 logout(): Observable<any> {
  localStorage.removeItem('token');
  return this.http.post(`${this.apiUrl}/logout`, {}); // Envío de la solicitud

}
clearToken(): void {
  this.token = null;
  localStorage.removeItem('token'); // Eliminar el token del localStorage
}
isTokenExpired(): boolean {
  const token = this.getToken();
  if (!token) return true;

  const payload = this.decodeToken(token);
  if (!payload.exp) return true; // Si no hay fecha de expiración, consideramos que está vencido

  const expirationDate = new Date(0);
  expirationDate.setUTCSeconds(payload.exp);
  return expirationDate < new Date(); // Devuelve true si el token ha expirado
}
private decodeToken(token: string): any {
  const payload = token.split('.')[1]; // Obtenemos el payload del token
  return JSON.parse(atob(payload)); // Decodificamos el payload
}

handleExpiredToken(): void {
  if (this.isTokenExpired()) {
    this.clearToken(); // Limpiar el token si está expirado
    this.router.navigate(['/']); // Redirigir al inicio de sesión
  }
}
}
