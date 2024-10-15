import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../servicios/user.service';
import { IUser } from '../../interfaces/user.interface';

@Component({
  selector: 'app-insert-user',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './insert-user.component.html',
  styleUrl: './insert-user.component.scss'
})
export class InsertUserComponent {
  userForm: FormGroup;
  isLoading = false;
  errorMessage = '';
  passwordsMatch: boolean = true; 

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router, private userService: UserService) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }
  onSubmit(): void {
    if (this.userForm.valid) {
        this.passwordsMatch = this.userForm.value.password === this.userForm.value.confirmPassword;
        if (!this.passwordsMatch) {
            this.errorMessage = 'Las contraseñas no coinciden.';
            return; // Detener la ejecución si no coinciden
          }
        this.isLoading = true;
      
      // Crear un objeto User con los valores del formulario
      const userFormValues : IUser = this.userForm.value;
      const user: IUser = {
        ...userFormValues,
        estado: '1'  // Asignar el valor 1 al campo estado
      };
      // Usar el servicio para agregar el usuario
      this.userService.addUser(user).subscribe({
        next: () => {
          this.isLoading = false;
          alert('Usuario insertado correctamente');
          this.router.navigate(['/userlista']);
        },
        error: (err) => {
          this.isLoading = false;
          this.errorMessage = 'Hubo un error al insertar el usuario';
          console.error(err);
        }
      });
    } else {
      this.errorMessage = 'Por favor, llena todos los campos correctamente';
    }
  }
}