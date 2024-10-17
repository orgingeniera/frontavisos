import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
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
export class InsertUserComponent  {
  userForm: FormGroup;
  isLoading = false;
  errorMessage = '';
  passwordsMatch: boolean = true; 
  isEditMode: boolean = false;
  userId: number | null = null;

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private http: HttpClient, private router: Router, private userService: UserService) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      apellido: ['', Validators.required],
      telefono: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      identificacion: ['', Validators.required],
      direccion: ['', Validators.required],
      confirmPassword: [''],
      estado: [''],
    });
  }
  ngOnInit(): void {
    const userIdString = this.route.snapshot.paramMap.get('id');
    this.userId = userIdString ? Number(userIdString) : null;
   
    if (this.userId) {
      this.isEditMode = true; // Activar el modo de edición
      this.loadUserData(this.userId); // Cargar los datos del usuario
    }
  }
  loadUserData(userId: number): void {
    this.userService.getUserById(userId).subscribe(user => {
      this.userForm.patchValue({
        name: user.name,
        apellido: user.apellido,
        telefono: user.telefono,
        direccion: user.direccion,
        email: user.email,
        identificacion: user.identificacion,
       
    }); // Poblamos el formulario con los datos del usuario
    }, error => {
      this.errorMessage = 'Error al cargar los datos del usuario';
      console.error(error);
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
        ...(this.isEditMode ? {} : { estado: '1' }),
        ...(this.isEditMode ? { id: this.userId } : {}),
      };
      console.log(user)
      if (this.isEditMode) {
        // Si estamos en modo edición, modificamos el usuario
        this.userService.updateUser(user).subscribe({
          next: () => {
            this.isLoading = false;
            alert('Usuario modificado correctamente');
            this.router.navigate(['/userlista']);
          },
          error: (err) => {
            this.isLoading = false;
            this.errorMessage = 'Hubo un error al modificar el usuario';
            console.error(err);
          }
        });
      } else {
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
    }
    } else {
      this.userForm.markAllAsTouched();
      this.errorMessage = 'Por favor, llena todos los campos correctamente';
    }

  }
  }
