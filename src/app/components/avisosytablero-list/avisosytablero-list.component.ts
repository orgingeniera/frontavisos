import { Component, OnInit } from '@angular/core';
import { AvisosyTableroService } from '../../servicios/avisosy-tablero.service';  // Importamos el servicio
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import * as XLSX from 'xlsx';
import { Iavisosytablero } from '../../interfaces/avisosytablero.interface';

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
    
  deleteUser(userId: number): void {
    console.log("eliinar")
  }
  
  
  insertUser(): void {
    console.log("insertar")
  }
}
