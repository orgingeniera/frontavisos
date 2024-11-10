import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ExcelUploadService {


  private apiUrl = environment.apiUrl;  
  constructor(private http: HttpClient) { }

  uploadExcel(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);

    return this.http.post(`${this.apiUrl}/upload-excel`, formData);
  }
  uploadExcelDeclaracionMensual(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);

    return this.http.post(`${this.apiUrl}/upload-excel-mensual`, formData);
  }
  uploadExcelDeclaracionBimestral(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);

    return this.http.post(`${this.apiUrl}/upload-excel-bimestral`, formData);
  }
}
