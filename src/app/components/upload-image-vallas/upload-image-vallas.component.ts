import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { VallasService } from '../../servicios/vallas.service';
import { IimagenVallas } from '../../interfaces/imageVallas.interface';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-uupload-image-vallas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './upload-image-vallas.component.html',
  styleUrl: './upload-image-vallas.component.scss'
})
export class UploadImageVallasComponent implements OnInit {
  vallasId!: number;
  selectedFile: File | null = null;
  images: IimagenVallas[] = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vallasService: VallasService
  ) {}

  ngOnInit(): void {
   
    this.vallasId = +this.route.snapshot.paramMap.get('id')!; // Obtener el ID del registro
    this.loadImages();
  }
  loadImages(): void {
    this.vallasService.getImages(this.vallasId).subscribe(
      (response: IimagenVallas[]) => {
        this.images = response; // Asignar las imágenes a la variable
      },
      (error) => {
        if (error.status === 404 && error.error?.message === "No se encontraron imágenes para esta declaración.") {
          console.warn('No se encontraron imágenes para esta declaración.');
        } else {
          console.error('Error al cargar las imágenes:', error);
        }
      }
    );
  }
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0]; // Guardar el archivo seleccionado
  }

  onUpload(): void {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('image', this.selectedFile); // Añadir el archivo al FormData
      formData.append('vallas_id', this.vallasId.toString()); // Añadir el ID de la declaración anual

      this.vallasService.uploadImage(formData).subscribe(
        response => {
          console.log('Imagen cargada exitosamente:', response);
          this.router.navigate(['/vallaslistas']); // Regresar a la lista
        },
        error => {
          console.error('Error al cargar la imagen:', error);
        }
      );
    }
  }
}
