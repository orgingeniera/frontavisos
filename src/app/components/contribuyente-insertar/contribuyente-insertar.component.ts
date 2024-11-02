import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ContribuyentesService } from '../../servicios/contribuyentes.service';
import { Icontribuyentes } from '../../interfaces/contribuyentes.interface';

@Component({
  selector: 'app-contribuyente-insertar',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './contribuyente-insertar.component.html',
  styleUrl: './contribuyente-insertar.component.scss'
})
export class ContribuyenteinsertarComponent  {
  declaracioanualForm: FormGroup;
  isLoading = false;
  errorMessage = '';
  passwordsMatch: boolean = true; 
  isEditMode: boolean = false;
  delaracionAnualId: number | null = null;

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private http: HttpClient, private router: Router, private contribuyentesService: ContribuyentesService) {
    this.declaracioanualForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      tipo_identificacion: ['', Validators.required],
      identificacion: ['', Validators.required],
      dv: [''],
      telefono: ['', Validators.required],
      direccion: ['', Validators.required],
      municipio: ['', Validators.required],
      departamento: ['', Validators.required],
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
    this.contribuyentesService.getContribuyentesById(delaracionAnualId).subscribe(declaracion => {
      console.log(declaracion)
      this.declaracioanualForm.patchValue({
        nombre: declaracion.nombre,
        apellido: declaracion.apellido,
        tipo_identificacion: declaracion.tipo_identificacion,
        identificacion: declaracion.identificacion,
        dv: declaracion.dv,
        telefono: declaracion.telefono,
        direccion: declaracion.direccion,
        municipio: declaracion.municipio,
        departamento: declaracion.departamento,
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
      const declaracioanualFormValues : Icontribuyentes = this.declaracioanualForm.value;
      const delaracion: Icontribuyentes = {
        ...declaracioanualFormValues,
        ...(this.isEditMode ? { id: this.delaracionAnualId } : {}),
      };
      if (this.isEditMode) {
        // Si estamos en modo edición, modificamos el declaración anual
        this.contribuyentesService.updategetContribuyentes(delaracion).subscribe({
          next: () => {
            this.isLoading = false;
            alert('Contruyente modificado correctamente');
            this.router.navigate(['/contribuyenteslista']);
          },
          error: (err) => {
            this.isLoading = false;
            this.errorMessage = 'Hubo un error al modificar el contribuyente';
            console.error(err);
          }
        });
      } else {
      // Usar el servicio para agregar el declaración anual
      
     this.contribuyentesService.addcontribuyente(delaracion).subscribe({
        next: () => {
          this.isLoading = false;
          alert('Contribuyente insertado correctamente');
          this.router.navigate(['/contribuyenteslista']);
        },
        error: (err) => {
          this.isLoading = false;
          this.errorMessage = 'Hubo un error al insertar el contribuyente';
          console.error(err);
        }
      });
    }
    } else {
      this.errorMessage = 'Por favor, llena todos los campos correctamente';
    }

  }


  
  }
