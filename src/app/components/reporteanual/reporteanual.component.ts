import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { DeclaracionMensualService } from '../../servicios/declarcionmensual.service';

interface ReporteData {
  nit_contribuyente: string;
  razon_social: string;
  total_industria_comercio: number;
  impuesto_avisos_tableros: number;
  imagenes: string[];
}
@Component({
  selector: 'app-reporteanual',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reporteanual.component.html',
  styleUrl: './reporteanual.component.scss'
})
export class ReporteanualComponent {
  @Input() reporteData!: ReporteData;
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
            </style>
          </head>
          <body onload="window.print();window.close()">
            <div class="title">Reporte del Contribuyente</div>
            <div class="subtitle">Novedad del Impuesto de Avisos y Tableros - Alcaldía de Riohacha</div>
            <div class="info">
              <p><strong>NIT Contribuyente:</strong> ${this.reporteData.nit_contribuyente}</p>
              <p><strong>Razón Social:</strong> ${this.reporteData.razon_social}</p>
              <p><strong>Total Industria y Comercio:</strong> ${this.reporteData.total_industria_comercio}</p>
              <p><strong>Impuesto Avisos y Tableros:</strong> ${this.reporteData.impuesto_avisos_tableros}</p>
            </div>
            <h6 style="text-align: center; margin: 10px 0;">Imágenes de evidencia</h6>
            <div class="images">
              ${this.reporteData.imagenes.map((img) => `<img src="${img}" alt="Imagen del registro" class="img-thumbnail"><br>`).join('')}
            </div>
          </body>
        </html>
      `);

      popupWindow.document.close();
    }
  }
  
}
