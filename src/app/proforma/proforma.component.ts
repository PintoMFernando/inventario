import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ModalserviceService } from '../services/modalservice.service';
import { ProformaService } from '../services/proforma.service';
import { PanelesService } from '../services/paneles.service';
import { v4 as uuidv4 } from 'uuid';
import { SalidasService } from '../services/salidas.service';
@Component({
  selector: 'app-proforma',
  templateUrl: './proforma.component.html',
  styleUrls: ['./proforma.component.css']
})
export class ProformaComponent {

  formulario: FormGroup;
  
  
  idsalida:string ="";
  idproforma:string ="";
  estado:number =0;
  mensaje: string = '';
  nombre: string = '';
  ci: string = '';
  telefono: number = 0;
  arraySalidas:any;
  datosAcumulados:any;
  idesalida:string = "";

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public ref: DynamicDialogConfig,
    private modalService:ModalserviceService,
    private proformaService:ProformaService,
    private panelesService:PanelesService,
    private prtoformaService: ProformaService,
    private salidasService: SalidasService,
  
  ) 
    {
    
    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      ci: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      telefono: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]]
    });
  }

  ngOnInit(): void {

    this.arraySalidas=this.ref.data.misdatos;
    this.idsalida=this.ref.data.idsalida;
    this.estado=this.ref.data.estado;
    this.nombre=this.ref.data.nombre;
    this.ci=this.ref.data.ci;
    this.telefono=this.ref.data.telefono;
    //this.idproforma=this.ref.data.idproforma;
    this.toggleFormControls();
    console.log("hay mi array o nel?=",this.arraySalidas)
    this.formulario.patchValue({
      nombre: this.nombre,
      ci: this.ci,
      telefono: this.telefono
    });

    
  }
  
  
  
  llamarArray(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.panelesService.datosRecibidos$.subscribe(datos => {
        this.datosAcumulados = datos;
        resolve(this.datosAcumulados);
      }, error => {
        reject(error);
      });
    });
  }
  
  async onSubmit() {
    

    //crear el proforma en la db
    //this.llamarArray()

  const arraySalidas= await this.llamarArray();

 console.log("sadasdasd",arraySalidas)

    if (this.formulario.valid) {
      console.log('Formulario enviado', this.formulario.value);
      const nombre = this.formulario.get('nombre')?.value;
    const ci = this.formulario.get('ci')?.value;
    const telefono = this.formulario.get('telefono')?.value;
      this.idproforma=uuidv4();
      await this.crearSalidas(this.idproforma,nombre,ci,telefono,arraySalidas);
      
      await this.router.navigate(['/proforma',this.idproforma]);
                             //await this.proformaService.editarProforma(this.idproforma,nombre,ci,telefono)
     await  this.modalService.closeModal();
     await this.modalService.enviarMensaje('que se ejecute');
     await this.panelesService.vaciarDatos();
    } else {
      console.log('Formulario inválido');
    }
  }

  async crearSalidas(idproforma:string,nombre:string,ci:number,telefono:any,arraySalidas:any){
    console.log("mi array ¿de salidas",arraySalidas)
    await this.prtoformaService.agregarProforma(idproforma,nombre,ci,telefono,this.idesalida)
    for (let salida of arraySalidas) {
      this.idesalida=salida?.idsalida
      await this.salidasService.agregarSalidas(salida?.idsalida,salida?.idproducto,salida?.precioProducto,salida?.cantidad,salida?.preciototal,salida?.descuento,this.idproforma,salida?.idstockproducto);//agregar aqui
      
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

  
  onInputChange(event: any) {
    const newValue = event.target.value.toUpperCase();
    this.formulario.get('nombre')?.setValue(newValue, { emitEvent: false });
  }

 

  

}
