import { Component, OnInit } from '@angular/core';
import { UserService } from '../../servicios/user.service';  // Importamos el servicio
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import * as XLSX from 'xlsx';
import { IUser } from 'src/app/interfaces/user.interface';

@Component({
  selector: 'app-user-list',
  standalone: true,
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  imports: [CommonModule, RouterModule ]
})
export class UserListComponent implements OnInit {
  users: any[] = [];  // Aquí se almacenarán los usuarios
  totalPages: number = 0; // Total de páginas
  currentPage: number = 1; // Página actual
  perPage: number = 10;
  perPageOptions: number[] = [10, 20, 50, 100];
  searchTerm: string = ''; 
  constructor(private userService: UserService, private router: Router) {}  // Inyectamos el servicio

  ngOnInit(): void {
    this.getUsers();
  }

  exportToExcel(): void {
    this.userService.getAllUsers().subscribe(users => {
      const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(users);
      const workbook: XLSX.WorkBook = XLSX.utils.book_new();
      
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Usuarios');
      
      // Generar archivo Excel
      XLSX.writeFile(workbook, 'usuarios.xlsx');
    });
  }
  getUsers(page: number = 1): void {
    this.userService.getUsers(page, this.perPage, this.searchTerm).subscribe(
      (response) => {
        this.users = response.data;
        this.totalPages = response.last_page;
        this.currentPage = response.current_page;
      },
      (error) => {
        console.error('Error al obtener los usuarios:', error);
      }
    );
  }
  // Método para manejar la búsqueda
  onSearch(event: any): void {
   
    this.searchTerm = event.target.value;  // Actualiza el término de búsqueda
    this.getUsers(1);  // Llama al método de obtener usuarios con el término de búsqueda
  }

  onPerPageChange(event: any): void {
    this.perPage = event.target.value;
    this.getUsers(1); // Volver a la primera página al cambiar la cantidad de registros
  }
  editUser(user: IUser): void {
    // Redirigir a la página de edición usando el ID del usuario
    this.router.navigate(['/modificar', user.id]);
   
  }
    
  deleteUser(userId: number): void {
    console.log("eliinar")
  }
  
  
  insertUser(): void {
    console.log("insertar")
  }
}
