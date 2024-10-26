import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DeclaracionAnualService } from '../../servicios/declaracion-anual.service';
import { Iavisosytablero } from '../../interfaces/avisosytablero.interface';

@Component({
  selector: 'app-declaracionanual',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './declaracionanual.component.html',
  styleUrl: './declaracionanual.component.scss'
})
export class DeclaracionanualComponent  {
  declaracioanualForm: FormGroup;
  isLoading = false;
  errorMessage = '';
  passwordsMatch: boolean = true; 
  isEditMode: boolean = false;
  delaracionAnualId: number | null = null;

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private http: HttpClient, private router: Router, private declaracionAnualService: DeclaracionAnualService) {
    this.declaracioanualForm = this.fb.group({
      n_declaracion: ['', Validators.required],
      vigencia: ['', Validators.required],
      fecha_declaracion: ['', Validators.required],
      nit_contribuyente: ['', Validators.required],
      razon_social: ['', Validators.required],
      regimen: [''],
      direccion: ['', Validators.required],
      ciudad: ['', Validators.required],
      correo_electronico: ['', [Validators.email]],
      total_ingresos_nacionales: [''],
      menos_ingresos_fuera_municipio: [''],
      total_ingresos_municipio: [''],
      menos_ingresos_rebajas: [''],
      menos_ingresos_exportaciones: [''],
      menos_ingresos_venta_activos: [''],
      menos_ingresos_no_gravados: [''],
      menos_ingresos_exentos: [''],
      total_ingresos_gravables: [''],
      total_impuesto: [''],
      capacidad_kw: [''],
      impuesto_ley_56: [''],
      total_industria_comercio: [''],
      impuesto_avisos_tableros: [''],
      pago_unidades_adicionales: [''],
      sobretasa_bomberil: [''],
      sobretasa_seguridad: [''],
      total_impuesto_cargo: ['']
    });
  }
  ngOnInit(): void {
    const delaracionAnualIdString = this.route.snapshot.paramMap.get('id');
    this.delaracionAnualId = delaracionAnualIdString ? Number(delaracionAnualIdString) : null;
   
    if (this.delaracionAnualId) {
      this.isEditMode = true; // Activar el modo de edición
      this.loadUserData(this.delaracionAnualId); // Cargar los datos del declaración anual
    }
  }
  loadUserData(delaracionAnualId: number): void {
    this.declaracionAnualService.getDeclaraacionAnualById(delaracionAnualId).subscribe(declaracion => {
      this.declaracioanualForm.patchValue({
        n_declaracion: declaracion.n_declaracion,
        vigencia: declaracion.vigencia,
        fecha_declaracion: declaracion.fecha_declaracion,
        nit_contribuyente: declaracion.nit_contribuyente,
        razon_social: declaracion.razon_social,
        regimen: declaracion.regimen,
        direccion: declaracion.direccion,
        ciudad: declaracion.ciudad,
        correo_electronico: declaracion.correo_electronico,
        total_ingresos_nacionales: declaracion.total_ingresos_nacionales,
        menos_ingresos_fuera_municipio: declaracion.menos_ingresos_fuera_municipio,
        total_ingresos_municipio: declaracion.total_ingresos_municipio,
        menos_ingresos_rebajas: declaracion.menos_ingresos_rebajas,
        menos_ingresos_exportaciones: declaracion.menos_ingresos_exportaciones,
        menos_ingresos_venta_activos: declaracion.menos_ingresos_venta_activos,
        menos_ingresos_no_gravados: declaracion.menos_ingresos_no_gravados,
        menos_ingresos_exentos: declaracion.menos_ingresos_exentos,
        total_ingresos_gravables: declaracion.total_ingresos_gravables,
        total_impuesto: declaracion.total_impuesto,
        capacidad_kw: declaracion.capacidad_kw,
        impuesto_ley_56: declaracion.impuesto_ley_56,
        total_industria_comercio: declaracion.total_industria_comercio,
        impuesto_avisos_tableros: declaracion.impuesto_avisos_tableros,
        pago_unidades_adicionales: declaracion.pago_unidades_adicionales,
        sobretasa_bomberil: declaracion.sobretasa_bomberil,
        sobretasa_seguridad: declaracion.sobretasa_seguridad,
        total_impuesto_cargo: declaracion.total_impuesto_cargo,
    }); // Poblamos el formulario con los datos del declaración anual
    }, error => {
      this.errorMessage = 'Error al cargar los datos del declaración anual';
      console.error(error);
    });
  }
  onSubmit(): void {
    if (this.declaracioanualForm.valid) {
       
        this.isLoading = true;
      
      // Crear un objeto User con los valores del formulario
      const declaracioanualFormValues : Iavisosytablero = this.declaracioanualForm.value;
      const delaracion: Iavisosytablero = {
        ...declaracioanualFormValues,
        ...(this.isEditMode ? { id: this.delaracionAnualId } : {}),
      };
      if (this.isEditMode) {
        // Si estamos en modo edición, modificamos el declaración anual
        this.declaracionAnualService.updategetDeclaraacionAnual(delaracion).subscribe({
          next: () => {
            this.isLoading = false;
            alert('declaración anual modificado correctamente');
            this.router.navigate(['/avisosytableroslista']);
          },
          error: (err) => {
            this.isLoading = false;
            this.errorMessage = 'Hubo un error al modificar el declaración anual';
            console.error(err);
          }
        });
      } else {
      // Usar el servicio para agregar el declaración anual
      console.log(delaracion)
     this.declaracionAnualService.adddeclaracionanual(delaracion).subscribe({
        next: () => {
          this.isLoading = false;
          alert('declaración anual insertado correctamente');
          this.router.navigate(['/avisosytableroslista']);
        },
        error: (err) => {
          this.isLoading = false;
          this.errorMessage = 'Hubo un error al insertar el declaración anual';
          console.error(err);
        }
      });
    }
    } else {
      this.errorMessage = 'Por favor, llena todos los campos correctamente';
    }

  }
  }
