import { Component } from '@angular/core';
import { ExcelUploadService } from '../../servicios/excel-upload.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-excel-upload',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './excel-upload.component.html',
  styleUrl: './excel-upload.component.scss'
})
export class ExcelUploadComponent {
  selectedFile: File | null = null;
  message: string | null = null;
  isSuccess: boolean = false;
  isLoading: boolean = false;
  fileUrl = 'assets/excel/avisosytableros.xlsx';
  constructor(private excelUploadService: ExcelUploadService) { }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.selectedFile = input.files[0];
    }
  }

  onUpload(): void {
    if (this.selectedFile) {
      this.isLoading = true; 
        this.excelUploadService.uploadExcel(this.selectedFile).subscribe(
          (response: any) => {
            this.isLoading = false;
            if (response.message === "1") {
              this.message = "Datos cargados con éxito.";
              this.isSuccess = true;
            } else {
              this.message = "No se pudieron cargar los datos. Por favor, revisa el archivo.";
              this.isSuccess = false;
            }
        },
        (error) => {
          this.isLoading = false;
          this.message = "Ocurrió un error al cargar el archivo.";
          this.isSuccess = false;
        }
      );
     }
    }
}
