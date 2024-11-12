import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUvt } from '../interfaces/uvt.interface';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class UvtService {
  private apiUrl = environment.apiUrl; 

  constructor(private http: HttpClient) {}

  getUvt(): Observable<IUvt> {
    return this.http.get<IUvt>(`${this.apiUrl}/uvt`);
  }

  updateUvt(uvt: IUvt): Observable<IUvt> {
    return this.http.put<IUvt>(`${this.apiUrl}/uvt/${uvt.id}`, uvt);
  }
}
