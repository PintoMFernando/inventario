import { ChangeDetectorRef, Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ModalserviceService } from '../services/modalservice.service';
import { EntradasService } from '../services/entradas.service';

@Component({
  selector: 'app-editar-entrada',
  templateUrl: './editar-entrada.component.html',
  styleUrls: ['./editar-entrada.component.css']
})
export class EditarEntradaComponent {
  
  identrada:string ="";
  precioentrada:number =0;
  cantidad:number =0;
  nombreproducto:string ="";


  

  constructor(
    public ref: DynamicDialogConfig,
    private cdRef: ChangeDetectorRef, 
    private messageService: MessageService, 
    private modalService:ModalserviceService,
    private entradasService: EntradasService

  )
  {}


  ngOnInit() {
    this.editarEntrada();
    

    
  }

  async editarEntrada(){
    this.identrada=this.ref.data.identrada;
  this.precioentrada=this.ref.data.precioentrada;
  this.cantidad=this.ref.data.cantidad;
  this.nombreproducto=this.ref.data.nombreproducto;

  }


  async submitForm(){

    this.cantidad;
    this.precioentrada;

    
    
    // Aquí podrías enviar los datos del producto a tu backend para su procesamiento y almacenamiento
    try {
      const response = this.entradasService.editarEntradas(this.identrada,this.cantidad,this.precioentrada)
     // const response = this.productoService.patchProducto(this.miProducto[0].idproducto,formDataelectronicos)
      await this.messageService.add({ severity: 'info', summary: 'Confirmado!', detail: 'La Entra de Producto fue Editado Con exito' });
      await  this.modalService.closeModal();
      await this.modalService.enviarMensaje('que se ejecute');
      console.log('Respuesta del backend:', response);
      // Aquí puedes manejar la respuesta del backend, por ejemplo, mostrar un mensaje al usuario
    } catch (error) {
      console.error('Error al llamar al servicio:', error);
      // Aquí puedes manejar el error, por ejemplo, mostrar un mensaje de error al usuario
    }






  }
  

  

}
