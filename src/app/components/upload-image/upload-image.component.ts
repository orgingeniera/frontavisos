import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { DeclaracionAnualService } from '../../servicios/declaracion-anual.service';
import { IDeclaracionAnulImage } from 'src/app/interfaces/image.interface';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-upload-image',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './upload-image.component.html',
  styleUrl: './upload-image.component.scss'
})
export class UploadImageComponent implements OnInit {
  declaracionId!: number;
  selectedFile: File | null = null;
  images: IDeclaracionAnulImage[] = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private declaracionAnualService: DeclaracionAnualService
  ) {}

  ngOnInit(): void {
   
    this.declaracionId = +this.route.snapshot.paramMap.get('id')!; // Obtener el ID del registro
    this.loadImages();
  }
  loadImages(): void {
    this.declaracionAnualService.getImages(this.declaracionId).subscribe(
      (response: IDeclaracionAnulImage[]) => {
        this.images = response; // Asignar las imágenes a la variable
      },
      (error) => {
        console.error('Error al cargar las imágenes:', error);
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
      formData.append('declaracionesanul_id', this.declaracionId.toString()); // Añadir el ID de la declaración anual

      this.declaracionAnualService.uploadImage(formData).subscribe(
        response => {
          console.log('Imagen cargada exitosamente:', response);
          this.router.navigate(['/avisosytableroslista']); // Regresar a la lista
        },
        error => {
          console.error('Error al cargar la imagen:', error);
        }
      );
    }
  }
}
