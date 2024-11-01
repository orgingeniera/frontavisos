import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DeclaracionMensualService } from '../../servicios/declarcionmensual.service';
import { Ideclaracionmensual } from '../../interfaces/declaracionmensualinterface';

@Component({
  selector: 'app-insertdeclaracionmensual',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './insertdeclaracionmensual.component.html',
  styleUrl:    './insertdeclaracionmensual.component.scss'
})
export class InsertdeclaracionmensualComponent  {
  declaracioanualForm: FormGroup;
  isLoading = false;
  errorMessage = '';
  passwordsMatch: boolean = true; 
  isEditMode: boolean = false;
  delaracionAnualId: number | null = null;

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private http: HttpClient, private router: Router, private declaracionMensualService: DeclaracionMensualService) {
    this.declaracioanualForm = this.fb.group({
      n_declaracion: ['', Validators.required],
      vigencia: ['', Validators.required],
      periodo: ['', Validators.required], // Nuevo campo
      fecha_declaracion: ['', Validators.required],
      nit_contribuyente: ['', Validators.required],
      razon_social: ['', Validators.required],
      regimen: [''],
      direccion: ['', Validators.required],
      ciudad: ['', Validators.required],
      correo_electronico: ['', [Validators.email]],
      total_ingresos_brutos: [''], // Total Ingresos Brutos Ordinarios y Extraordinarios
      menos_devoluciones_subsidios: [''], // Menos Devoluciones y Subsidios
      menos_ingresos_fuera_municipio: [''], // Menos Ingresos Obtenidos Fuera del Municipio
      menos_ventas_activos_exportacion: [''], // Menos Ventas de Activos Fijos y Exportación
      menos_ingresos_exentos_no_sujetos: [''], // Menos Ingresos por Actividades Exentas y No Sujetas
      total_ingresos_gravables: [''], // Total Ingresos Gravables Autoretención
      autoretencion_impuesto_industria_comercio: [''], // Autoretención de Impuesto de Industria y Comercio
      mas_autoretenciones_impuestos_avisos_tableros: [''], // Más Autoretenciones de Impuestos de Avisos y Tableros
      total_autoretencion_mensual: [''] // Total Autoretención Mensual
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
    this.declaracionMensualService.getDeclaraacionMensualById(delaracionAnualId).subscribe(declaracion => {
      
      // Poblamos el formulario con los datos del declaración anual
      this.declaracioanualForm.patchValue({
        n_declaracion: declaracion.n_declaracion,
        vigencia: declaracion.vigencia,
        periodo: declaracion.periodo, // Campo de tipo string
        fecha_declaracion: declaracion.fecha_declaracion,
        nit_contribuyente: declaracion.nit_contribuyente,
        razon_social: declaracion.razon_social,
        regimen: declaracion.regimen,
        direccion: declaracion.direccion,
        ciudad: declaracion.ciudad,
        correo_electronico: declaracion.correo_electronico,
        total_ingresos_brutos: declaracion.total_ingresos_brutos, // Total Ingresos Brutos Ordinarios y Extraordinarios
        menos_devoluciones_subsidios: declaracion.menos_devoluciones_subsidios, // Menos Devoluciones y Subsidios
        menos_ingresos_fuera_municipio: declaracion.menos_ingresos_fuera_municipio, // Menos Ingresos Fuera del Municipio
        menos_ventas_activos_exportacion: declaracion.menos_ventas_activos_exportacion, // Menos Ventas de Activos Fijos y Exportación
        menos_ingresos_exentos_no_sujetos: declaracion.menos_ingresos_exentos_no_sujetos, // Menos Ingresos Exentos y No Sujetos
        total_ingresos_gravables: declaracion.total_ingresos_gravables, // Total Ingresos Gravables Autoretención
        autoretencion_impuesto_industria_comercio: declaracion.autoretencion_impuesto_industria_comercio, // Autoretención de Impuesto de Industria y Comercio
        mas_autoretenciones_impuestos_avisos_tableros: declaracion.mas_autoretenciones_impuestos_avisos_tableros, // Más Autoretenciones de Impuestos de Avisos y Tableros
        total_autoretencion_mensual: declaracion.total_autoretencion_mensual, // Total Autoretención Mensual
    });
    
    }, error => {
      this.errorMessage = 'Error al cargar los datos del declaración anual';
      console.error(error);
    });
  }
  onSubmit(): void {
    
    if (this.declaracioanualForm.valid) {
       
        this.isLoading = true;
      
      // Crear un objeto User con los valores del formulario
      const declaracioanualFormValues : Ideclaracionmensual = this.declaracioanualForm.value;
      const delaracion: Ideclaracionmensual = {
        ...declaracioanualFormValues,
        ...(this.isEditMode ? { id: this.delaracionAnualId } : {}),
      };
      if (this.isEditMode) {
        // Si estamos en modo edición, modificamos el declaración anual
        this.declaracionMensualService.updategetDeclaraacionMensual(delaracion).subscribe({
          next: () => {
            this.isLoading = false;
            alert('declaración mensual modificado correctamente');
            this.router.navigate(['/declaracionmensuallista']);
          },
          error: (err) => {
            this.isLoading = false;
            this.errorMessage = 'Hubo un error al modificar el declaración anual';
            console.error(err);
          }
        });
      } else {
      // Usar el servicio para agregar el declaración anual
     
     this.declaracionMensualService.adddeclaracionmensual(delaracion).subscribe({
        next: () => {
          this.isLoading = false;
          alert('declaración mensual insertado correctamente');
          this.router.navigate(['/declaracionmensuallista']);
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
