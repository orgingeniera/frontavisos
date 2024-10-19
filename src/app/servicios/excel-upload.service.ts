import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AutService } from './aut.service';
@Injectable({
  providedIn: 'root'
})
export class ExcelUploadService {


  private apiUrl = 'http://127.0.0.1:8000/api'; 
  constructor(private http: HttpClient, private autService:AutService) { }

  uploadExcel(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);

    return this.http.post(`${this.apiUrl}/upload-excel`, formData, { headers: this.autService.getHeaders() });
  }
}
