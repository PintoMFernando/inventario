import { ChangeDetectorRef, Component } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ProductoService } from '../services/producto.service';
import { lastValueFrom } from 'rxjs';
import { MessageService } from 'primeng/api';
import { ModalserviceService } from '../services/modalservice.service';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.css']
})
export class EditarProductoComponent {

  idproducto:any;
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
    this.editarProducto();
    

    
  }

  async editarProducto(){

    this.idproducto=this.ref.data.idproducto;
    // this.data=await this.productoService.verProducto(this.idproducto)
     const source$ = this.productoService.editarProducto(this.idproducto); //con esto traigo el id
    const data:any = await lastValueFrom(source$);
    this.miProducto=data;
    this.nombreImage=data[0].image
     console.log("traer mis datos?????",this.miProducto)
     console.log("traer mis datoasdasdasdas?????",data[0].nombre)
     this.cdRef.detectChanges();
 
 
  }


  

  async submitForm() {

    const formDataelectronicos = new FormData();
    formDataelectronicos.append('idproducto', this.miProducto[0].idproducto);
    formDataelectronicos.append('image', this.evento);
    formDataelectronicos.append('nombre', this.miProducto[0].nombre);
    formDataelectronicos.append('descripcion', this.miProducto[0].descripcion);
    formDataelectronicos.append('precio', this.miProducto[0].precio);
    formDataelectronicos.append('codigo', "PD" + (Number(this.miProducto[0].codigo)));
  
    formDataelectronicos.append('stock', this.miProducto[0].stock);

    console.log('Producto registrado:',this.miProducto);
    console.log('Producto mi ID==:',this.miProducto[0].idproducto);
    
    // Aquí podrías enviar los datos del producto a tu backend para su procesamiento y almacenamiento
    try {
      const response = this.productoService.patchProducto(this.miProducto[0].idproducto,this.miProducto)
     // const response = this.productoService.patchProducto(this.miProducto[0].idproducto,formDataelectronicos)
      await this.messageService.add({ severity: 'info', summary: 'Confirmado!', detail: 'Producto Editado Con exito' });
      await  this.modalService.closeModal();
      await this.modalService.enviarMensaje('que se ejecute');
      console.log('Respuesta del backend:', response);
      console.log('Respuesta entra a mi archivo:', this.evento);
  
      // Aquí puedes manejar la respuesta del backend, por ejemplo, mostrar un mensaje al usuario
    } catch (error) {
      console.error('Error al llamar al servicio:', error);
      // Aquí puedes manejar el error, por ejemplo, mostrar un mensaje de error al usuario
    }
  }


  async onUpload(event: any){
    //console.log("aqui esta mi event",event)
     this.evento = await event.files[0];
     this.imagenSeleccionada = true;
   //this.botonClickeado[i] = true;
   //this.botonguardar[i]= false;
   await this.messageService.add({ severity: 'success', summary: 'Exito!!', detail: 'Imagen Seleccionada Exitosamente ' });
  
  }


  
  


}
function uuidv4(): string | Blob {
  throw new Error('Function not implemented.');
}

