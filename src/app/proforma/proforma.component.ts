import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ModalserviceService } from '../services/modalservice.service';

@Component({
  selector: 'app-proforma',
  templateUrl: './proforma.component.html',
  styleUrls: ['./proforma.component.css']
})
export class ProformaComponent {

  formulario: FormGroup;
  
  
  idsalida:string ="";
  estado:number =0;
  mensaje: string = '';
  nombre: string = '';
  ci: string = '';
  telefono: number = 0;


  constructor(private fb: FormBuilder,private router: Router,public ref: DynamicDialogConfig,private modalService:ModalserviceService,) {
    
    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      ci: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      telefono: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]]
    });
  }

  ngOnInit(): void {
    this.idsalida=this.ref.data.idsalida;
    this.estado=this.ref.data.estado;
    this.nombre=this.ref.data.nombre;
    this.ci=this.ref.data.ci;
    this.telefono=this.ref.data.telefono;
    this.toggleFormControls();
    console.log("hay nonmbre o nel?=",this.nombre)
    this.formulario.patchValue({
      nombre: this.nombre,
      ci: this.ci,
      telefono: this.telefono
    });
  }

  
  async onSubmit() {
    
   
  

 console.log("sadasdasd",this.formulario)

    if (this.formulario.valid) {
      console.log('Formulario enviado', this.formulario.value);
      const nombre = this.formulario.get('nombre')?.value;
    const ci = this.formulario.get('ci')?.value;
    const telefono = this.formulario.get('telefono')?.value;

      this.router.navigate(['/proforma', this.idsalida,nombre,ci,telefono]);
      await  this.modalService.closeModal();
        await this.modalService.enviarMensaje('que se ejecute');
    } else {
      console.log('Formulario inválido');
    }
  }


  toggleFormControls(): void {
    if (this.estado === 2) { // Aquí defines tu condición
      this.formulario.controls['nombre'].disable();
      this.formulario.controls['ci'].disable();
      this.formulario.controls['telefono'].disable();
    } else {
      this.formulario.controls['nombre'].enable();
      this.formulario.controls['ci'].enable();
      this.formulario.controls['telefono'].enable();
    }
  }

 

  

}
