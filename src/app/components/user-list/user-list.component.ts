import { Component, OnInit } from '@angular/core';
import { UserService } from '../../servicios/user.service';  // Importamos el servicio
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

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
  perPageOptions: number[] = [5, 10, 20, 50, 100];
  constructor(private userService: UserService, private router: Router) {}  // Inyectamos el servicio

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(page: number = 1): void {
    this.userService.getUsers(page, this.perPage).subscribe(
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
  onPerPageChange(event: any): void {
    this.perPage = event.target.value;
    this.getUsers(1); // Volver a la primera página al cambiar la cantidad de registros
  }
  editUser(user: any): void {
    console.log("editar")
    }
    
  deleteUser(userId: number): void {
    console.log("eliinar")
  }
  
  
  insertUser(): void {
    console.log("insertar")
  }
}
