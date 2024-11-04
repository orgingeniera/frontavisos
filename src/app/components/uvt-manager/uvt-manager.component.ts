import { Component, OnInit } from '@angular/core';
import { UvtService } from '../../servicios/uvt.service';
import { IUvt } from '../../interfaces/uvt.interface';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-uvt-manager',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './uvt-manager.component.html',
  styleUrls: ['./uvt-manager.component.scss']
})
export class UvtManagerComponent implements OnInit {
  uvt!: IUvt;
  message: string | null = null; // Variable para el mensaje
  error: boolean = false; // Variable para el estado de error

  constructor(private uvtService: UvtService) {}

  ngOnInit(): void {
    this.loadUvt();
  }

  loadUvt(): void {
    this.uvtService.getUvt().subscribe((data) => {
      this.uvt = data;
    });
  }

  validateInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = Number(input.value);
    if (isNaN(value) || value <= 0) {
      this.message = 'Por favor, ingrese un número válido mayor que cero.';
      this.error = true; // Establecer el estado de error
    } else {
      this.message = null; // Limpiar mensaje si el valor es válido
      this.error = false; // Restablecer estado de error
    }
  }

  isValid(): boolean {
    return this.uvt && this.uvt.valor > 0; // Verifica que el valor sea mayor que cero
  }

  updateUvt(): void {
    this.uvtService.updateUvt(this.uvt).pipe(
      catchError((err) => {
        this.message = 'Hubo un error al actualizar el UVT.'; // Mensaje de error
        this.error = true; // Establecer el estado de error
        return of(err); // Devuelve un observable vacío
      })
    ).subscribe((response) => {
      if (!this.error) {
        this.message = 'UVT actualizado con éxito.'; // Mensaje de éxito
        alert('UVT actualizado con éxito');
      }
    });
  }
}
