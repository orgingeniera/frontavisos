import { Component, OnInit } from '@angular/core';
  // Importamos el servicio
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import * as XLSX from 'xlsx';
import { Ideclaracionmensual } from '../../interfaces/declaracionmensualinterface';
import { IReporteData } from '../../interfaces/ReporteData.interface';

import { catchError, of } from 'rxjs';
import { DeclaracionBimestralService } from '../../servicios/declarciobimestral.service';
import { IDeclaracionAnulImage } from '../../interfaces/image.interface';
import { ReporteBimestralComponent } from '../reportebimestral/reportemensual.component';

@Component({
  selector: 'app-declaracionbimestral-list',
  standalone: true,
  templateUrl: './declaracionbimestral-list.component.html',
  styleUrls: ['./declaracionbimestral-list.component.scss'],
  imports: [CommonModule, RouterModule,ReporteBimestralComponent ]
})
export class DeclaracionbimestralListComponent implements OnInit {
  avisosytablero: any[] = [];  // Aquí se almacenarán los usuarios
  totalPages: number = 0; // Total de páginas
  currentPage: number = 1; // Página actual
  total: number = 0;
  perPage: number = 10;
  perPageOptions: number[] = [10, 20, 50, 100];
  searchTerm: string = ''; 
  Math = Math;
  filterType: string = '';
  reporteData: any = null;


  
  constructor( private declaracionBimestralService: DeclaracionBimestralService, private router: Router) {}  // Inyectamos el servicio

  ngOnInit(): void {
   
    this.getDeclaracionBimestral();
  }

  exportToExcel(): void {
    this.declaracionBimestralService.getAlldeclaracionmensualcontroller().subscribe(declaracionMensuales => {
      const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(declaracionMensuales);
      const workbook: XLSX.WorkBook = XLSX.utils.book_new();
      
      XLSX.utils.book_append_sheet(workbook, worksheet, 'DeclaracionesMensuales');
      
      // Generar archivo Excel
      XLSX.writeFile(workbook, 'DeclaracionesMensuales.xlsx');
    });
  }
  closeModal(): void {
    // Lógica para cerrar el modal
    this.reporteData = null; // Restablecemos la variable para cerrar el modal
  }
  onFilterChange(event: any): void {
    this.filterType = event.target.value;  // Almacena el tipo de filtro seleccionado
    this.getDeclaracionBimestral(1);  // Llama nuevamente a la función para aplicar el filtro
  }

  getDeclaracionBimestral(page: number = 1): void {
    this.declaracionBimestralService.getDeclaracionBimestral(page, this.perPage, this.searchTerm).subscribe(
      (response) => {
        let filteredData = response.data;

        if (this.filterType === 'inexactos') {
          // Filtra registros donde autoretencion_impuesto_industria_comercio * 0.15 sea diferente de mas_autoretenciones_impuestos_avisos_tableros
          filteredData = filteredData.filter((avisos: any) =>
            this.calcularImpuesto(avisos) !== Number(avisos.mas_autoretenciones_impuestos_avisos_tableros) && Number(avisos.mas_autoretenciones_impuestos_avisos_tableros) > 0
          );
        } else if (this.filterType === 'presuncion') {
          // Filtra registros donde mas_autoretenciones_impuestos_avisos_tableros está en cero o vacío
          filteredData = filteredData.filter((avisos: any) => !Number(avisos.mas_autoretenciones_impuestos_avisos_tableros) || Number(avisos.mas_autoretenciones_impuestos_avisos_tableros) === 0
          );
        }

        this.avisosytablero = filteredData;
        this.totalPages = response.last_page;
        this.currentPage = response.current_page;
        this.total = response.total;
      },
      (error) => {
        console.error('Error al obtener los avisos y tableros:', error);
      }
    );
  }
  // Método para manejar la búsqueda
  onSearch(event: any): void {
   
    this.searchTerm = event.target.value;  // Actualiza el término de búsqueda
    this.getDeclaracionBimestral(1);  // Llama al método de obtener usuarios con el término de búsqueda
  }

  onPerPageChange(event: any): void {
    this.perPage = event.target.value;
    this.getDeclaracionBimestral(1); // Volver a la primera página al cambiar la cantidad de registros
  }
 
  limpiarTabla(): void {
    if (confirm("¿Estás seguro de que deseas eliminar todos los datos de la tabla? Esta acción no se puede deshacer.")) {
        this.declaracionBimestralService.eliminarDeclaracionesBimestral().subscribe(
            (response) => {
              this.avisosytablero = [];
                console.log(response.message); // Mensaje de éxito
                // Lógica adicional para actualizar la vista si es necesario
            },
            (error) => {
                console.error('Error al eliminar los datos:', error);
            }
        );
    }
}   
  deleteDeclaracionAnual(declaracionanualId: number) {
    const conf = confirm("¿Está seguro de eliminar este registro: " + declaracionanualId + "?");
    if (conf) {
      this.declaracionBimestralService.deletedeclaracionBimestral(declaracionanualId).pipe(
        catchError((error: any) => {  // Especifica 'any' como tipo para 'error'
          console.error('Error al eliminar declaración', error);
          return of(null); // Controlar errores
        })
      ).subscribe(response => {
        if (response) {
          console.log('Declaracion bimestraal eliminada con éxito');
          this.refreshUserList(); // Refrescar la lista de usuarios después de eliminar
        }
      });
    }
  }
  
  refreshUserList() {
    // Aquí deberías volver a obtener todos los usuarios
    this.declaracionBimestralService.getAllclaracionbimestral().subscribe(
      (data: Ideclaracionmensual[]) => {
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
    
    const resultadoSinRedondear = avisos.autoretencion_impuesto_industria_comercio * 0.15; // Calcula el 15%
     const resultado = Math.round(resultadoSinRedondear / 1000) * 1000; // Redondear a la centena más cercana
   
     return resultado;
  }
  isImpuestoIncorrecto(avisos: any): boolean {
    const impuestoCalculado = this.calcularImpuesto(avisos);
       return (Number(avisos.mas_autoretenciones_impuestos_avisos_tableros) !== impuestoCalculado && avisos.autoretencion_impuesto_industria_comercio > 0) || 
           (Number(avisos.mas_autoretenciones_impuestos_avisos_tableros) === 0 || !Number(avisos.mas_autoretenciones_impuestos_avisos_tableros));
}

openUploadImageForm(declaracionId: number): void {
  this.router.navigate(['/uploadimage', declaracionId]);
}
 editModificardeclaracionanual(avisosytablero: Ideclaracionmensual): void {
    // Redirigir a la página de edición usando el ID del usuario
    this.router.navigate(['/modificardeclaracionbimestral', avisosytablero.id]);
   
  }
  
  mostrarReporte(avisos: any): void {
      const reporteData: IReporteData = {
        nit_contribuyente: avisos.nit_contribuyente,
        razon_social: avisos.razon_social,
        autoretencion_impuesto_industria_comercio: avisos.autoretencion_impuesto_industria_comercio,
        mas_autoretenciones_impuestos_avisos_tableros: avisos.mas_autoretenciones_impuestos_avisos_tableros,
        imagenes:  [] as string[], // Inicialmente vacío, se llenará con las rutas de las imágenes
        declaraciones: []
      };
      this.declaracionBimestralService.getAllDeclaracionBimestralByNit(avisos.nit_contribuyente)
        .subscribe(
          (declaraciones) => {
            console.log('Declaraciones obtenidas:', declaraciones);
            // Asignar las declaraciones al reporteData o realizar otra acción según necesites
            reporteData['declaraciones'] = declaraciones;
            this.reporteData = reporteData;
          },
          (error) => {
            console.error('Error al obtener las declaraciones:', error);
          }
        );
    // Llamar al servicio para obtener las imágenes asociadas
  /*  this.DeclaracionBimestralService.getImages(avisos.id).subscribe(
      (response: IDeclaracionAnulImage[] ) => {
       
        reporteData.imagenes = response.map(image => image.image_url); // Extrae la ruta de cada imagen
       // console.log("Reporte del registro con imágenes:", reporteData);
        this.reporteData = reporteData;
        // Aquí puedes abrir un modal o mostrar los datos como prefieras
        // Ejemplo: this.openReportModal(reporteData);
      },
      (error) => {
        // Verifica si el error es el mensaje esperado
          if (error.status === 404 && error.error?.message === "No se encontraron imágenes para esta declaración.") {
            console.warn('No se encontraron imágenes para esta declaración.');
            reporteData.imagenes = []; // Mantén las imágenes como un array vacío
            this.reporteData = reporteData; // Aún así, asigna los datos para mostrar el popup sin imágenes
          } else {
            console.error('Error al cargar las imágenes:', error);
          }
      }
    );*/
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
    }
    // Restablece el valor del <select> para que vuelva a la opción predeterminada
    event.target.value = '';
  }
  
}
