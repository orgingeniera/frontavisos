import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { VallasService } from '../../servicios/vallas.service';  // Importamos el servicio
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import * as XLSX from 'xlsx';
import { Iavisosytablero } from '../../interfaces/avisosytablero.interface';
import { Ivallas } from '../../interfaces/vallas.interface';

import { catchError, of } from 'rxjs';
import { IimagenVallas } from '../../interfaces/imageVallas.interface';
import { ReportevallasComponent } from '../reportevallas/reportevallas.component';

@Component({
  selector: 'app-vallas-list',
  standalone: true,
  templateUrl: './vallas-list.component.html',
  styleUrls: ['./vallas-list.component.scss'],
  imports: [CommonModule, RouterModule,ReportevallasComponent ],
  encapsulation: ViewEncapsulation.None
})
export class VallasListComponent implements OnInit {
  avisosytablero: any[] = [];  // Aquí se almacenarán los usuarios
  totalPages: number = 0; // Total de páginas
  currentPage: number = 1; // Página actual
  perPage: number = 10;
  perPageOptions: number[] = [10, 20, 50, 100];
  searchTerm: string = ''; 
  Math = Math;
  filterType: string = '';
  reporteData: any = null;
  
  constructor(private vallasService: VallasService, private router: Router) {}  // Inyectamos el servicio

  ngOnInit(): void {
   
    this.getAvisosytableros();
  }

  exportToExcel(): void {
    this.vallasService.getAllAvisosytableros().subscribe(avisosytablero => {
      const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(avisosytablero);
      const workbook: XLSX.WorkBook = XLSX.utils.book_new();
      
      XLSX.utils.book_append_sheet(workbook, worksheet, 'publicidadexterior');
      
      // Generar archivo Excel
      XLSX.writeFile(workbook, 'publicidadexterior.xlsx');
    });
  }
  closeModal(): void {
    // Lógica para cerrar el modal
    this.reporteData = null; // Restablecemos la variable para cerrar el modal
  }
  onFilterChange(event: any): void {
    this.filterType = event.target.value;  // Almacena el tipo de filtro seleccionado
    this.getAvisosytableros(1);  // Llama nuevamente a la función para aplicar el filtro
  }
  isNearOneYear(avisos: any): boolean {
    const fechaInstalacionDate = new Date(avisos.fecha_instalacion);
    const now = new Date();
    const oneYearAgo = new Date(fechaInstalacionDate);
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() + 1);
    const twoMonthsBeforeOneYear = new Date(oneYearAgo);
    twoMonthsBeforeOneYear.setMonth(twoMonthsBeforeOneYear.getMonth() - 2);
  
    
    return now >= twoMonthsBeforeOneYear;
  }
  getAvisosytableros(page: number = 1): void {
    this.vallasService.getAvisosytableros(page, this.perPage, this.searchTerm).subscribe(
      (response) => {
        
        // Mapeamos los avisos y agregamos la propiedad isNearOneYear
        this.avisosytablero = response.data
        /*.map((avisos: Ivallas) => {
          const isNear = this.isNearOneYear(avisos.fecha_instalacion);
          console.log(avisos.fecha_instalacion, isNear); // Para verificar la condición
 
          return {
            ...avisos,
            isNearOneYear: this.isNearOneYear(avisos.fecha_instalacion)
          };
        });*/
  
        this.totalPages = response.last_page;
        this.currentPage = response.current_page;
      },
      (error) => {
        console.error('Error al obtener los avisos y tableros:', error);
      }
    );
  }
  
  // Método para manejar la búsqueda
  onSearch(event: any): void {
   
    this.searchTerm = event.target.value;  // Actualiza el término de búsqueda
    this.getAvisosytableros(1);  // Llama al método de obtener usuarios con el término de búsqueda
  }

  onPerPageChange(event: any): void {
    this.perPage = event.target.value;
    this.getAvisosytableros(1); // Volver a la primera página al cambiar la cantidad de registros
  }
 
    
  deleteDeclaracionAnual(declaracionanualId: number) {
    const conf = confirm("¿Está seguro de eliminar este registro: " + declaracionanualId + "?");
    if (conf) {
      this.vallasService.deleteDeclaraacionAnual(declaracionanualId).pipe(
        catchError((error: any) => {  // Especifica 'any' como tipo para 'error'
          console.error('Error al eliminar el aviso exterior', error);
          return of(null); // Controlar errores
        })
      ).subscribe(response => {
        if (response) {
          console.log('aviso exterior eliminado con éxito');
          this.refreshUserList(); // Refrescar la lista de usuarios después de eliminar
        }
      });
    }
  }
  
  refreshUserList() {
    // Aquí deberías volver a obtener todos los usuarios
    this.vallasService.getAllclaracionanual().subscribe(
      (data: Iavisosytablero[]) => {
        // Actualiza directamente la variable con los datos recibidos
        this.avisosytablero = data; 
         // Opcional: muestra la lista actualizada en la consola
      },
      (error) => {
        console.error('Error al obtener la lista de declaracion anual', error); // Manejo de errores
      }
    );
  }
  
  
  calcularImpuesto(avisos: any): number {
    
    const resultadoSinRedondear = avisos.total_industria_comercio * 0.15; // Calcula el 15%
     const resultado = Math.round(resultadoSinRedondear / 1000) * 1000; // Redondear a la centena más cercana
   
     return resultado;
  }
  isImpuestoIncorrecto(avisos: any): boolean {
    const impuestoCalculado = this.calcularImpuesto(avisos);
       return (Number(avisos.impuesto_avisos_tableros) !== impuestoCalculado && avisos.total_industria_comercio > 0) || 
           (Number(avisos.impuesto_avisos_tableros) === 0 || !Number(avisos.impuesto_avisos_tableros));
}

openUploadImageForm(vallasId: number): void {
  this.router.navigate(['/uploadimagevallas', vallasId]);
}
 editModificardeclaracionanual(avisosytablero: Iavisosytablero): void {
    // Redirigir a la página de edición usando el ID del usuario
    this.router.navigate(['/modificarvallas', avisosytablero.id]);
   
  }
  /*reportegeneral(avisosytablero: Iavisosytablero): void {
   
    this.router.navigate(['/reportegeneral', avisosytablero.nit_contribuyente]);
    

  }*/
  mostrarReporte(avisos: any): void {
    const reporteData = {
      opcion: avisos.opcion,
      n_registro: avisos.n_registro,
      fecha_instalacion: avisos.fecha_instalacion,
      lugar_instalacion: avisos.lugar_instalacion,
      donde_instalo: avisos.donde_instalo,
      base_gravable: avisos.base_gravable,
      impuesto_pagar: avisos.impuesto_pagar,
      contribuyente_id: avisos.contribuyente_id,
      nombre_contribuyente: avisos.contribuyente.nombre,
      apellido_contribuyente: avisos.contribuyente.apellido,
      tipo_identificacion_contribuyente: avisos.contribuyente.tipo_identificacion,
      identificacion_contribuyente: avisos.contribuyente.identificacion,
      dv_contribuyente: avisos.contribuyente.dv,
      telefono_contribuyente: avisos.contribuyente.telefono,
      direccion_contribuyente: avisos.contribuyente.direccion,
      municipio_contribuyente: avisos.contribuyente.municipio,
      departamento_contribuyente: avisos.contribuyente.departamento,
      imagenes: [] as string[]
    };
  
    // Llamar al servicio para obtener las imágenes asociadas
    this.vallasService.getImages(avisos.id).subscribe(
      (response: IimagenVallas[] ) => {
       
        reporteData.imagenes = response.map(image => image.image_url); // Extrae la ruta de cada imagen
       // console.log("Reporte del registro con imágenes:", reporteData);
        this.reporteData = reporteData;
        // Aquí puedes abrir un modal o mostrar los datos como prefieras
        // Ejemplo: this.openReportModal(reporteData);
      },
      (error) => {
        // Verifica si el error es el mensaje esperado
          if (error.status === 404 && error.error?.message === "No se encontraron imágenes para esta publicidad exterior.") {
            console.warn('No se encontraron imágenes para esta publicidad exterior.');
            reporteData.imagenes = []; // Mantén las imágenes como un array vacío
            this.reporteData = reporteData; // Aún así, asigna los datos para mostrar el popup sin imágenes
          } else {
            console.error('Error al cargar las imágenes:', error);
          }
      }
    );
  }
  
  onActionChange(event: any, avisos: any): void {
    const action = event.target.value;
    switch(action) {
      case 'actualizar':
        this.editModificardeclaracionanual(avisos);
        break;
      case 'eliminar':
        this.deleteDeclaracionAnual(avisos.id);
        break;
      case 'cargarImagen':
        this.openUploadImageForm(avisos.id);
        break;
      case 'reporte':
        this.mostrarReporte(avisos);
      break;
      /*case 'reportegeneral':
        this.reportegeneral(avisos);
      break;*/
    }
    // Restablece el valor del <select> para que vuelva a la opción predeterminada
    event.target.value = '';
  }
  
}
