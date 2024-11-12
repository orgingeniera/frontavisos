// src/app/components/declaraciones/declaraciones.component.ts

import { Component, OnInit } from '@angular/core';
import { ReportegeneralDeclaracionesService } from '../../servicios/reportegeneraldeclaraciones.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-reportegeneraldeclaraciones',
  templateUrl: './reportegeneraldeclaraciones.component.html',
  styleUrls: ['./reportegeneraldeclaraciones.component.scss']
})
export class ReporteGeneralDeclaracionesComponent implements OnInit {
  infoGeneral: any;
  declaracionesAnuales: any[] = [];
  declaracionesMensuales: any[] = [];
  declaracionesBimestrales: any[] = [];
  nit: string | null = null;
  mensaje: string | null = null; // Para almacenar el mensaje
  tipoAlerta: string | null = null; // Para el tipo de alerta ('success' o 'danger')
  totalAutoretencionIndustriaComercio: number = 0;
  totalMasAutoretencionesAvisosTableros: number = 0;
  totalBimestralesAutoretencionIndustriaComercio: number = 0;
  totalBimestralesMasAutoretencionesAvisosTableros: number = 0;
  constructor(private route: ActivatedRoute,private reportegeneralDeclaracionesService: ReportegeneralDeclaracionesService) {}

  ngOnInit(): void {
    const delaracionAnualIdString = this.route.snapshot.paramMap.get('id');
    if (delaracionAnualIdString) {
      this.nit = delaracionAnualIdString;
    } else {
      // Maneja el caso en el que 'id' es null, por ejemplo, muestra un mensaje de error o redirige.
      console.error('No se encontró el parámetro "id" en la ruta');
      this.nit = ''; // o cualquier valor por defecto que prefieras
    }
  
    this.obtenerDeclaraciones();
     // Carga tus datos...
     
  }
    
  calcularTotalesMensuales() {
    this.totalAutoretencionIndustriaComercio = this.declaracionesMensuales.reduce((acc, declaracion) => acc + Number(declaracion.autoretencion_impuesto_industria_comercio || 0), 0);
    this.totalMasAutoretencionesAvisosTableros = this.declaracionesMensuales.reduce((acc, declaracion) => acc + Number(declaracion.mas_autoretenciones_impuestos_avisos_tableros || 0), 0);
  }

  calcularTotalesBimestrales() {
    this.totalBimestralesAutoretencionIndustriaComercio = this.declaracionesBimestrales.reduce((acc, declaracion) => acc + Number(declaracion.autoretencion_impuesto_industria_comercio || 0), 0);
    this.totalBimestralesMasAutoretencionesAvisosTableros = this.declaracionesBimestrales.reduce((acc, declaracion) => acc + Number(declaracion.mas_autoretenciones_impuestos_avisos_tableros || 0), 0);
  }
  obtenerDeclaraciones() {
    if (!this.nit) {
      console.error('NIT no definido');
      return;
    }
    const year = new Date().getFullYear();
    const vigenciaanterior = year - 1;
    this.reportegeneralDeclaracionesService.obtenerDeclaraciones(this.nit, vigenciaanterior).subscribe(
      (data) => {
        this.infoGeneral = data.info_general;
        this.declaracionesAnuales = data.declaraciones_anuales;
        this.declaracionesMensuales = data.declaraciones_mensuales;
        this.declaracionesBimestrales = data.declaraciones_bimestrales;
        // Lógica para verificar las sumas
        this.verificarConcordancia();
      },
      (error) => {
        console.error('Error al obtener las declaraciones:', error);
      }
    );
  }
  verificarConcordancia() {
    // Sumar las autoretenciones de Industria y Comercio
    const sumaAutoretencionIndustriaComercio = this.declaracionesAnuales.reduce((acc, declaracion) => {
      return acc + (declaracion.autoretencion_impuesto_industria_comercio || 0);
    }, 0);
  
    // Comparar con el total de Industria y Comercio
    const totalIndustriaComercio = this.infoGeneral?.total_industria_comercio || 0;
  
    // Sumar las autoretenciones de Avisos y Tableros
    const sumaMasAutoretencionesAvisosTableros = this.declaracionesMensuales.reduce((acc, declaracion) => {
      return acc + (declaracion.mas_autoretenciones_impuestos_avisos_tableros || 0);
    }, 0);
  
    // Comparar con el impuesto de Avisos y Tableros
    const impuestoAvisosTableros = this.infoGeneral?.impuesto_avisos_tableros || 0;
  
    // Verificar si todas las variables son 0
    if (sumaAutoretencionIndustriaComercio === 0 && totalIndustriaComercio === 0 && 
        sumaMasAutoretencionesAvisosTableros === 0 && impuestoAvisosTableros === 0) {
      this.mensaje = '⚠️ El contribuyente tiene presunción de omiso porque tiene valores son cero.';
      this.tipoAlerta = 'alert-warning'; // Tipo de alerta advertencia
    }
    // Verificar si los valores no concuerdan
    else if (sumaAutoretencionIndustriaComercio !== totalIndustriaComercio || 
             sumaMasAutoretencionesAvisosTableros !== impuestoAvisosTableros) {
      this.mensaje = '⚠️ El contribuyente se encuentra omiso porque los valores no concuerdan.';
      this.tipoAlerta = 'alert-danger'; // Tipo de alerta peligro
    }
    // Si los valores son iguales
    else {
      this.mensaje = '✅ El contribuyente NO está omiso porque los datos concuerdan.';
      this.tipoAlerta = 'alert-success'; // Tipo de alerta éxito
    }
  }
  
}
