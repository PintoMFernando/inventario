import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ModalserviceService } from '../services/modalservice.service';
import { ProformaService } from '../services/proforma.service';
import { Subscription, lastValueFrom } from 'rxjs';
import { SalidasService } from '../services/salidas.service';

@Component({
  selector: 'app-editar-proforma',
  templateUrl: './editar-proforma.component.html',
  styleUrls: ['./editar-proforma.component.css']
})
export class EditarProformaComponent {


  idproforma:any;
  nombre:any;
  ci:any;
  telefono: any;
  fecha:any;
  formulario: FormGroup;
  estado:any;
  guardarDeshabilitado:any;
  misSalidas:any;
  idesalida:any;
  updating: boolean = false;
  constructor(
    private fb: FormBuilder,
    public ref: DynamicDialogConfig,
    private modalService:ModalserviceService,
    private proformaService:ProformaService,
    private salidasService:SalidasService
    //private cdRef: ChangeDetectorRef, 
    

  ){
   
    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      ci: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      telefono: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
      estado: ['', Validators.required] 
    });

    

  }
  
 /* producto = {
    nombre: '',
    descripcion: '',
    precio: 0,
    codigo: ''
  };*/


  ngOnInit() {
    this.idproforma=this.ref.data.idproforma;
    this.nombre=this.ref.data.nombre;
    this.ci=this.ref.data.ci;
    this.telefono=this.ref.data.telefono;
    this.fecha=this.ref.data.fecha;
    this.estado=this.ref.data.estado;
    
    //this.editarProducto();
    this.formulario.patchValue({
      nombre: this.nombre,
      ci: this.ci,
      telefono: this.telefono,
      estado: this.estado === 1 ? '1' : '2'
    });
    console.log("sadasdasd mis datos?",this.idproforma,this.nombre,this.ci,this.telefono,this.fecha,this.estado)

     //para el fomrulario deshabilitar
    if (this.estado === 2) {
      this.formulario.disable();
    } else {
      this.formulario.enable();
    }

    this.formulario.get('estado')?.valueChanges.subscribe(value => {
      if (!this.updating) {
        this.updating = true;
        if (value === '2') {
          this.formulario.disable({ emitEvent: false }); // Deshabilita sin emitir eventos
        } else {
          this.formulario.enable({ emitEvent: false }); // Habilita sin emitir eventos
        }
        this.updating = false;
      }
    });
  

  //para el borton deshabilitado
    if (this.estado === 2 || this.formulario.invalid) {
      this.guardarDeshabilitado = true;
    } else {
      this.guardarDeshabilitado = false;
    }


    
  }

  async onSubmit() {
    const estado1 = this.formulario.get('estado')?.value;
    if(estado1==2){//preguntar si esta anulando
        await this.updatesalidasProductos(this.idproforma);
        await  this.modalService.closeModal();
         await this.modalService.enviarMensajeSalidas(this.fecha);
         await this.proformaService.editarProformaestado(this.idproforma,estado1)

    }else{

    console.log("sadasdasd mi formulario",this.formulario)
   
       if (this.formulario.valid) {
         console.log('Formulario enviado', this.formulario.value);
       
         const nombre = this.formulario.get('nombre')?.value;
       const ci = this.formulario.get('ci')?.value;
       const telefono = this.formulario.get('telefono')?.value;
       const estado = this.formulario.get('estado')?.value;
   
         
         await this.proformaService.editarProforma(this.idproforma,nombre,ci,telefono,estado)
         await  this.modalService.closeModal();
         await this.modalService.enviarMensajeSalidas(this.fecha);
       } else {
         console.log('Formulario inválido');
       }
     }
     


    }



    async updatesalidasProductos(idproforma:string){ //esto 


      //this.proformaService.traerunProforma(idproforma)

      const source$ = this.proformaService.traerunProforma(idproforma);
      const data:any = await lastValueFrom(source$);
      this.misSalidas=data;

      console.log("mis salidas", this.misSalidas, "mi data",data )

      for (let salida of this.misSalidas.salidas) {
       const idsalida=salida?.idsalida
       const idproducto=salida?.idproducto
       const cantidad=salida?.cantidad
        await  this.salidasService.eliminarSalida(idsalida,idproducto,cantidad); //que elimine, de todas formas no se podra ya cambiar a valido, per igual traera los datos
        
          
    }
    
    }

  

}
