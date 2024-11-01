import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { DeclaracionMensualService } from '../../servicios/declarcionmensual.service';
import { IReporteData } from '../../interfaces/ReporteData.interface';

interface ReporteData {
  nit_contribuyente: string;
  razon_social: string;
  total_industria_comercio: number;
  impuesto_avisos_tableros: number;
  imagenes: string[];
}
@Component({
  selector: 'app-reportemensual',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reportemensual.component.html',
  styleUrl: './reportemensual.component.scss'
})
export class ReportemensualComponent {
  @Input() reporteData!: IReporteData;
 @Output() close = new EventEmitter<void>(); // Evento para cerrar el modal
  constructor() {}

  ngOnInit(): void {
    
  }

  closeModal(): void {
    this.close.emit(); // Emitir el evento para cerrar el modal
  }
  
  printReport() {
    const printContent = document.querySelector('.modal-content')?.innerHTML;
    const popupWindow = window.open('', '_blank', 'width=800, height=600');
    if (popupWindow && printContent) {
      popupWindow.document.open();
    
      popupWindow.document.write(`
       <html>
      <head>
        <title>Reporte del Contribuyente</title>
        <style>
          /* Estilos del reporte para impresión */
          body { font-family: Arial, sans-serif; margin: 20px; }
          .title { font-size: 24px; font-weight: bold; text-align: center; margin-bottom: 5px; }
          .subtitle { font-size: 16px; color: #555; text-align: center; margin-bottom: 15px; }
          .info { margin-bottom: 10px; line-height: 1.6; }
          .info strong { color: #333; }
          .images { display: flex; flex-wrap: wrap; justify-content: center; gap: 5px; }
          .img-thumbnail { max-width: 300px; max-height: 120px; border: 1px solid #ddd; border-radius: 5px; }
          .declaraciones-table { width: 100%; border-collapse: collapse; margin-top: 15px; }
          .declaraciones-table th, .declaraciones-table td { border: 1px solid #ddd; padding: 8px; text-align: center; }
          .declaraciones-table th { background-color: #f2f2f2; }
        </style>
      </head>
      <body onload="window.print();window.close()">
        <div class="title">Reporte del Contribuyente</div>
        <div class="subtitle">Novedad del Impuesto de Avisos y Tableros - Alcaldía de Riohacha</div>
        <div class="info">
          <p><strong>NIT Contribuyente:</strong> ${this.reporteData.nit_contribuyente}</p>
          <p><strong>Razón Social:</strong> ${this.reporteData.razon_social}</p>
           </div>
        <h6 style="text-align: center; margin: 10px 0;">Imágenes de evidencia</h6>
        <div class="images">
          ${this.reporteData.imagenes.map((img) => `<img src="${img}" alt="Imagen del registro" class="img-thumbnail"><br>`).join('')}
        </div>

        <h6 style="text-align: center; margin: 10px 0;">Detalles de Declaraciones</h6>
        <table class="declaraciones-table">
          <thead>
            <tr>
              <th>Año</th>
              <th>Periodo</th>
              <th>Industria y comercio</th>
              <th>Avisos y tableros</th>
              <!-- Agrega más columnas según las propiedades de cada declaración -->
            </tr>
          </thead>
          <tbody>
            ${(() => {
              let filas = '';
              if (this.reporteData.declaraciones && this.reporteData.declaraciones.length > 0) {
                this.reporteData.declaraciones.forEach(declaracion => {
                  filas += `
                    <tr>
                      <td>${declaracion.vigencia || 'N/A'}</td>
                      <td>${declaracion.periodo || 'N/A'}</td>
                      <td>${declaracion.autoretencion_impuesto_industria_comercio || 'N/A'}</td>
                      <td>${declaracion.mas_autoretenciones_impuestos_avisos_tableros || 'N/A'}</td>
                      <!-- Agrega más celdas aquí según las propiedades que necesites -->
                    </tr>
                  `;
                });
              } else {
                filas = '<tr><td colspan="4">No hay declaraciones disponibles</td></tr>';
              }
              return filas;
            })()}
          </tbody>
        </table>
      </body>
      </html>

      `);
      
      popupWindow.document.close();
    }
  }
  
  
}
