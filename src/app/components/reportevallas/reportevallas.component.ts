import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { DeclaracionMensualService } from '../../servicios/declarcionmensual.service';

interface ReporteData {
    opcion: string;
    n_registro: string;
    fecha_instalacion: string;
    lugar_instalacion: string;
    donde_instalo: string;
    base_gravable: number;
    impuesto_pagar: number;
    contribuyente_id: number;
    image_path: string;
    nombre_contribuyente: string;
    image_url: string;     
    imagenes: string[];
    apellido_contribuyente: string;
    tipo_identificacion_contribuyente: string;
    identificacion_contribuyente: string;
    dv_contribuyente: string;
    telefono_contribuyente: string;
    direccion_contribuyente: string;
    municipio_contribuyente: string;
    departamento_contribuyente: string;
}
@Component({
  selector: 'app-reportevallas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reportevallas.component.html',
  styleUrl: './reportevallas.component.scss'
})
export class ReportevallasComponent {
  @Input() reporteData!: ReporteData;
 @Output() close = new EventEmitter<void>(); // Evento para cerrar el modal
  constructor() {}

  ngOnInit(): void {
   console.log(this.reporteData)
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
          body { font-family: Arial, sans-serif; margin: 20px; }
          .title { font-size: 24px; font-weight: bold; text-align: center; margin-bottom: 5px; }
          .subtitle { font-size: 16px; color: #555; text-align: center; margin-bottom: 15px; }
          .info { margin-bottom: 10px; line-height: 1.6; }
          .info strong { color: #333; }
          .table { width: 100%; border-collapse: collapse; margin-bottom: 15px; }
          .table, .table th, .table td { border: 1px solid #ddd; padding: 8px; }
          .table th { background-color: #f2f2f2; }
          .images { display: flex; flex-wrap: wrap; justify-content: center; gap: 5px; margin-top: 10px; }
          .img-thumbnail { max-width: 300px; max-height: 120px; border: 1px solid #ddd; border-radius: 5px; }
        </style>
      </head>
      <body onload="window.print();window.close()">
        <div class="title">Reporte del Contribuyente</div>
        <div class="subtitle">Novedad del Impuesto de Avisos y Tableros - Alcaldía de Riohacha</div>
        
        <div class="info">
          <h5>Información del Contribuyente</h5>
          <table class="table">
            <tr>
              <th>Opción</th>
              <td>${this.reporteData.opcion}</td>
            </tr>
            <tr>
              <th>Apellidos y nombres o razón social</th>
              <td>${this.reporteData.nombre_contribuyente} ${this.reporteData.apellido_contribuyente}</td>
            </tr>
            <tr>
              <td colspan="2">
                <strong>Tipo Identificación:</strong> ${this.reporteData.tipo_identificacion_contribuyente} <br>
                <strong>Identificación:</strong> ${this.reporteData.identificacion_contribuyente}
              </td>
            </tr>
            <tr>
              <td colspan="2">
                <strong>DV:</strong> ${this.reporteData.dv_contribuyente} <br>
                <strong>Teléfono:</strong> ${this.reporteData.telefono_contribuyente}
              </td>
            </tr>
            <tr>
              <th>Dirección</th>
              <td>${this.reporteData.direccion_contribuyente}</td>
            </tr>
            <tr>
              <td colspan="2">
                <strong>Municipio:</strong> ${this.reporteData.municipio_contribuyente} <br>
                <strong>Departamento:</strong> ${this.reporteData.departamento_contribuyente}
              </td>
            </tr>
          </table>

          <h5>Información de la Valla</h5>
          <table class="table">
            <tr>
              <th>Registro</th>
              <td>${this.reporteData.n_registro}</td>
            </tr>
            <tr>
              <th>Fecha instalación</th>
              <td>${this.reporteData.fecha_instalacion}</td>
            </tr>
            <tr>
              <td colspan="2">
                <strong>Lugar Instalación:</strong> ${this.reporteData.lugar_instalacion} <br>
                <strong>${this.reporteData.lugar_instalacion === 'predio' ? 'Dirección' : (this.reporteData.lugar_instalacion === 'vehiculo' ? 'Placa' : 'Donde')}:</strong> ${this.reporteData.donde_instalo}
              </td>
            </tr>
          </table>

          <h5>Base Gravable</h5>
          <table class="table">
            <tr>
              <td colspan="2">
                <strong>Base Gravable:</strong> ${this.reporteData.base_gravable} <br>
                <strong>Impuesto a Pagar:</strong> ${this.reporteData.impuesto_pagar}
              </td>
            </tr>
          </table>

          <h6 style="text-align: center; margin: 10px 0;">Imágenes de evidencia</h6>
          <div class="images">
            ${this.reporteData.imagenes.map(img => `<img src="${img}" alt="Imagen del registro" class="img-thumbnail">`).join('')}
          </div>
        </div>
      </body>
    </html>
      `);

      popupWindow.document.close();
    }
    
  }
  
}
