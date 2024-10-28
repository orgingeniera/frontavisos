import { Component, OnInit } from '@angular/core';
import { AvisosyTableroService } from '../../servicios/avisosy-tablero.service';  // Importamos el servicio
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import * as XLSX from 'xlsx';
import { Iavisosytablero } from '../../interfaces/avisosytablero.interface';
import { catchError, of } from 'rxjs';
@Component({
  selector: 'app-avisosytablero-list',
  standalone: true,
  templateUrl: './avisosytablero-list.component.html',
  styleUrls: ['./avisosytablero-list.component.scss'],
  imports: [CommonModule, RouterModule ]
})
export class avisosytableroListComponent implements OnInit {
  avisosytablero: any[] = [];  // Aquí se almacenarán los usuarios
  totalPages: number = 0; // Total de páginas
  currentPage: number = 1; // Página actual
  perPage: number = 10;
  perPageOptions: number[] = [10, 20, 50, 100];
  searchTerm: string = ''; 
  Math = Math; 
  constructor(private avisosyTableroService: AvisosyTableroService, private router: Router) {}  // Inyectamos el servicio

  ngOnInit(): void {
   
    this.getAvisosytableros();
  }

  exportToExcel(): void {
    this.avisosyTableroService.getAllAvisosytableros().subscribe(avisosytablero => {
      const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(avisosytablero);
      const workbook: XLSX.WorkBook = XLSX.utils.book_new();
      
      XLSX.utils.book_append_sheet(workbook, worksheet, 'AvisosyTableros');
      
      // Generar archivo Excel
      XLSX.writeFile(workbook, 'AvisosyTableros.xlsx');
    });
  }
  getAvisosytableros(page: number = 1): void {
    this.avisosyTableroService.getAvisosytableros(page, this.perPage, this.searchTerm).subscribe(
      (response) => {
        this.avisosytablero = response.data;
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
  editModificardeclaracionanual(avisosytablero: Iavisosytablero): void {
    // Redirigir a la página de edición usando el ID del usuario
    this.router.navigate(['/modificardeclaracionanual', avisosytablero.id]);
   
  }
    
  deleteDeclaracionAnual(declaracionanualId: number) {
    const conf = confirm("¿Está seguro de eliminar este registro: " + declaracionanualId + "?");
    if (conf) {
      this.avisosyTableroService.deleteDeclaraacionAnual(declaracionanualId).pipe(
        catchError((error: any) => {  // Especifica 'any' como tipo para 'error'
          console.error('Error al eliminar el usuario', error);
          return of(null); // Controlar errores
        })
      ).subscribe(response => {
        if (response) {
          console.log('Usuario eliminado con éxito');
          this.refreshUserList(); // Refrescar la lista de usuarios después de eliminar
        }
      });
    }
  }
  
  refreshUserList() {
    // Aquí deberías volver a obtener todos los usuarios
    this.avisosyTableroService.getAllclaracionanual().subscribe(
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
     console.log((Number(avisos.impuesto_avisos_tableros) !== impuestoCalculado && avisos.total_industria_comercio > 0) || 
     (Number(avisos.impuesto_avisos_tableros) === 0 || !Number(avisos.impuesto_avisos_tableros))) 
   return (Number(avisos.impuesto_avisos_tableros) !== impuestoCalculado && avisos.total_industria_comercio > 0) || 
           (Number(avisos.impuesto_avisos_tableros) === 0 || !Number(avisos.impuesto_avisos_tableros));
}
}
