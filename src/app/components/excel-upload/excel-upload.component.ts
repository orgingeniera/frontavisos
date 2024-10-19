import { Component } from '@angular/core';
import { ExcelUploadService } from '../../servicios/excel-upload.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-excel-upload',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './excel-upload.component.html',
  styleUrl: './excel-upload.component.scss'
})
export class ExcelUploadComponent {
  selectedFile: File | null = null;
  message: string | null = null;
  isSuccess: boolean = false;

  constructor(private excelUploadService: ExcelUploadService) { }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.selectedFile = input.files[0];
    }
  }

  onUpload(): void {
    if (this.selectedFile) {
        this.excelUploadService.uploadExcel(this.selectedFile).subscribe(
          (response: any) => {
            if (response.message === "1") {
              this.message = "Datos cargados con éxito.";
              this.isSuccess = true;
            } else {
              this.message = "No se pudieron cargar los datos. Por favor, revisa el archivo.";
              this.isSuccess = false;
            }
        },
        (error) => {
          this.message = "Ocurrió un error al cargar el archivo.";
          this.isSuccess = false;
        }
      );
     }
    }
}
