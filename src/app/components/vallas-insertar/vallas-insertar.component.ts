import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Ivallas } from '../../interfaces/vallas.interface';
import { ContribuyentesService } from '../../servicios/contribuyentes.service';  // Importamos el servicio
import { VallasService } from '../../servicios/vallas.service';  // Importamos el servicio
import { Icontribuyentes } from '../../interfaces//contribuyentes.interface';

@Component({
  selector: 'app-vallas-insertar',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './vallas-insertar.component.html',
  styleUrl: './vallas-insertar.component.scss'
})
export class VallasInsertarComponent  {
  declaracioanualForm: FormGroup;
  isLoading = false;
  errorMessage = '';
  passwordsMatch: boolean = true; 
  isEditMode: boolean = false;
  delaracionAnualId: number | null = null;
  contribuyentes: any[] = []; 
  lugarInstalacionLabel: string = '¿Dónde Instaló?';
  lugarInstalacionPlaceholder: string = 'Ingresa dónde instaló';
  private readonly UVT_VALUE = 47065; // Valor actual del UVT en pesos

  constructor(private contribuyentesService: ContribuyentesService,private route: ActivatedRoute, private fb: FormBuilder, private http: HttpClient, private router: Router, private vallasService: VallasService) {
    this.declaracioanualForm = this.fb.group({
      opcion: ['', Validators.required],
      n_registro: ['', Validators.required],
      fecha_instalacion: ['', Validators.required],
      lugar_instalacion: ['', Validators.required],
      donde_instalo: ['', Validators.required],
      base_gravable: ['', Validators.required],
      impuesto_pagar: [{ value: '', disabled: true }, Validators.required],  
      contribuyente_id: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.refreshUserList()
    const delaracionAnualIdString = this.route.snapshot.paramMap.get('id');
    this.delaracionAnualId = delaracionAnualIdString ? Number(delaracionAnualIdString) : null;
   
    if (this.delaracionAnualId) {
      this.isEditMode = true; // Activar el modo de edición
      this.loadUserData(this.delaracionAnualId); // Cargar los datos del declaración anual
    }
  }
  onBaseGravableChange(event: Event) {
    const uvtMultiplier = Number((event.target as HTMLSelectElement).value);

    if (uvtMultiplier) {
      const impuesto = uvtMultiplier * this.UVT_VALUE;
      this.declaracioanualForm.get('impuesto_pagar')?.setValue(impuesto);
    }
  }
  loadUserData(delaracionAnualId: number): void {
    this.vallasService.getDeclaraacionAnualById(delaracionAnualId).subscribe(declaracion => {
      this.declaracioanualForm.patchValue({
        opcion: declaracion.opcion,
        n_registro: declaracion.n_registro,
        fecha_instalacion: declaracion.fecha_instalacion,
        lugar_instalacion: declaracion.lugar_instalacion,
        donde_instalo: declaracion.donde_instalo,
        base_gravable: declaracion.base_gravable,
        impuesto_pagar: declaracion.impuesto_pagar,
        contribuyente_id: declaracion.contribuyente_id
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
      const declaracioanualFormValues : Ivallas = this.declaracioanualForm.value;
      const delaracion: Ivallas = {
        ...declaracioanualFormValues,
        ...(this.isEditMode ? { id: this.delaracionAnualId } : {}),
        impuesto_pagar: this.declaracioanualForm.get('impuesto_pagar')?.value || 0 };
      if (this.isEditMode) {
        // Si estamos en modo edición, modificamos el declaración anual
        this.vallasService.updategetDeclaraacionAnual(delaracion).subscribe({
          next: () => {
            this.isLoading = false;
            alert('declaración anual modificado correctamente');
            this.router.navigate(['/vallaslistas']);
          },
          error: (err) => {
            this.isLoading = false;
            this.errorMessage = 'Hubo un error al modificar el declaración anual';
            console.error(err);
          }
        });
      } else {
      // Usar el servicio para agregar el declaración anual
    
     this.vallasService.adddeclaracionanual(delaracion).subscribe({
        next: () => {
          this.isLoading = false;
          alert('declaración anual insertado correctamente');
          this.router.navigate(['/vallaslistas']);
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
  onLugarInstalacionChange(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    
    if (selectedValue === 'vehiculo') {
      this.lugarInstalacionLabel = 'Placa';
      this.lugarInstalacionPlaceholder = 'Ingresa la placa del vehículo';
    } else {
      this.lugarInstalacionLabel = 'Predio';
      this.lugarInstalacionPlaceholder = 'Ingresa el Predio donde instaló';
    }
  }
  refreshUserList() {
    // Aquí deberías volver a obtener todos los usuarios
    this.contribuyentesService.getAllcontribuyente().subscribe(
      (data: Icontribuyentes[]) => {
        // Actualiza directamente la variable con los datos recibidos
        this.contribuyentes = data; 
        
         // Opcional: muestra la lista actualizada en la consola
      },
      (error) => {
        console.error('Error al obtener la lista de declaracion anual', error); // Manejo de errores
      }
    );
  }
  
  }
