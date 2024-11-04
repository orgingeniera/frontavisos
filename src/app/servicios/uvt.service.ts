import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUvt } from '../interfaces/uvt.interface';

@Injectable({
  providedIn: 'root',
})
export class UvtService {
  private apiUrl = 'http://127.0.0.1:8000/api'; 

  constructor(private http: HttpClient) {}

  getUvt(): Observable<IUvt> {
    return this.http.get<IUvt>(`${this.apiUrl}/uvt`);
  }

  updateUvt(uvt: IUvt): Observable<IUvt> {
    return this.http.put<IUvt>(`${this.apiUrl}/uvt/${uvt.id}`, uvt);
  }
}
