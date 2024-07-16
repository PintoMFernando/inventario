import { ChangeDetectorRef, Component } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ProductoService } from '../services/producto.service';
import { MessageService } from 'primeng/api';
import { ModalserviceService } from '../services/modalservice.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-editarsubproducto',
  templateUrl: './editarsubproducto.component.html',
  styleUrls: ['./editarsubproducto.component.css']
})
export class EditarsubproductoComponent {

  
  idstockproducto:any;
  producto: string="";
  data:any;
  miProducto:any []=[];
  imagenSeleccionada: boolean = false;
  nombre: string="";
  evento: File ;
  urlImage:string= 'http://localhost:3000/upload/';
  nombreImage:string =''; 
  

  constructor(
    public ref: DynamicDialogConfig,
    public productoService: ProductoService,
    private cdRef: ChangeDetectorRef, 
    private messageService: MessageService, 
    private modalService:ModalserviceService

  ){
    this.evento = new File([],'');
    
  }
  
 /* producto = {
    nombre: '',
    descripcion: '',
    precio: 0,
    codigo: ''
  };*/


  ngOnInit() {
    this.editarsubProducto();
    

    
  }

  async editarsubProducto(){

    this.idstockproducto=this.ref.data.idproducto;
    // this.data=await this.productoService.verProducto(this.idproducto)
     const source$ = this.productoService.editarsubProducto(this.idstockproducto); //con esto traigo el id
    const data:any = await lastValueFrom(source$);
    this.miProducto=data;
    this.nombreImage=data[0].image
     console.log("traer mis datos?????",this.miProducto)
     console.log("traer mis datoasdasdasdas?????",data[0].nombre)
     this.cdRef.detectChanges();
 
 
  }


  

  async submitForm(dat:any) {
    console.log('Datos del formulario:', dat);
     const idstockproducto=dat.idstockproducto;
     const  descripcion=dat.descripcion;
     const precio=dat.precio;
     const datos ={
      
      descripcion:descripcion,
      precio:precio

     }
    
    // Aquí podrías enviar los datos del producto a tu backend para su procesamiento y almacenamiento
    try {
      const response = this.productoService.patchstockProducto(idstockproducto,datos)
       
      await this.messageService.add({ severity: 'info', summary: 'Confirmado!', detail: 'Producto Editado Con exito' });
      await  this.modalService.closeModal();
      await this.modalService.enviarMensaje('que se ejecute');
      //console.log('Respuesta del backend:', response);
      console.log('Respuesta entra a mi archivo:', this.evento);
  
      // Aquí puedes manejar la respuesta del backend, por ejemplo, mostrar un mensaje al usuario
    } catch (error) {
      console.error('Error al llamar al servicio:', error);
      // Aquí puedes manejar el error, por ejemplo, mostrar un mensaje de error al usuario
    }
  }


  


  

}
