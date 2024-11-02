import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'  // Hace que el servicio esté disponible en toda la aplicación
})
export class ReportegeneralDeclaracionesService {
  private apiUrl = 'http://127.0.0.1:8000/api';  // URL de la API

  constructor(private http: HttpClient) {}
   // Método para obtener declaraciones por nit
   obtenerDeclaraciones(nit: string): Observable<any> {
    console.log(`${this.apiUrl}/obtenerDeclaracionesPorNit/${nit}`)
    return this.http.get(`${this.apiUrl}/obtenerDeclaracionesPorNit/${nit}`);
  }
}
