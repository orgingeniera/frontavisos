import { Component } from '@angular/core';
import { CommonModule, NgStyle } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { IconDirective } from '@coreui/icons-angular';
import { AutService } from '../../../servicios/aut.service';
import { ContainerComponent, RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, FormControlDirective, ButtonDirective } from '@coreui/angular';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    standalone: true,
    imports: [CommonModule,ContainerComponent,FormsModule, RouterModule, RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, IconDirective, FormControlDirective, ButtonDirective, NgStyle]
})
export class LoginComponent {
  credentials = {
    email: '',
    password: ''
  };
  errorMessage: string = '';
  isLoading: boolean = false;
  constructor(private authService: AutService, private router: Router) {}
  login(): void {
    this.isLoading = true;  // Activa el estado de cargando
    this.authService.login(this.credentials).subscribe(
      (response) => {
        this.isLoading = false;
        this.authService.setToken(response.token);
        this.router.navigate(['/dashboard']);  // Redirige a un dashboard o página protegida
      },
      (error) => {
        this.isLoading = false;
        this.errorMessage = 'Verifique los datos ingresados, por favor.';
        console.error('Error en el inicio de sesión:', error);
      }
    );
  }
 
  
}
