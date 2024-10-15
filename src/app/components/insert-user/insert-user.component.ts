import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

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

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  onSubmit() {
    if (this.userForm.valid) {
      console.log("entro")
      /*this.isLoading = true;
      this.http.post('http://127.0.0.1:8000/api/users', this.userForm.value)
        .subscribe({
          next: () => {
            this.isLoading = false;
            alert('Usuario insertado correctamente');
            this.router.navigate(['/users']);
          },
          error: (err) => {
            this.isLoading = false;
            this.errorMessage = 'Hubo un error al insertar el usuario';
            console.error(err);
          }
        });*/
    } else {
      console.log("error")
     // this.errorMessage = 'Por favor, llena todos los campos correctamente';
    }
  }
}
