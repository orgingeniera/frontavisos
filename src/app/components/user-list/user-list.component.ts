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

  constructor(private userService: UserService, private router: Router) {}  // Inyectamos el servicio

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers().subscribe(
      (response) => {
       // Verifica si la respuesta es un array o un solo objeto
      if (Array.isArray(response)) {
        this.users = response; // Si es un array, úsalo tal cual
      } else {
        this.users = [response]; // Si es un solo objeto, conviértelo en un array con un solo elemento
      }
      },
      (error) => {
        console.error('Error al obtener los usuarios:', error);
      }
    );
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
