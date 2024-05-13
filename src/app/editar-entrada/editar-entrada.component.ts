import { ChangeDetectorRef, Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
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
  stockinventario:number=0;
   cantidadanterior:number=0;
   tipo:number=0;
   idproducto:string ="";
   detalle:string ="";
   


  

  constructor(
    public ref: DynamicDialogConfig,
    private cdRef: ChangeDetectorRef, 
    private messageService: MessageService, 
    private modalService:ModalserviceService,
    private entradasService: EntradasService,
    private confirmationService: ConfirmationService, 

  )
  {}


  ngOnInit() {
    this.editarEntrada();
    

    
  }

   editarEntrada(){
    this.identrada=this.ref.data.identrada;
  this.precioentrada=this.ref.data.precioentrada;
  this.cantidad=this.ref.data.cantidad;
  this.nombreproducto=this.ref.data.nombreproducto;
  this.stockinventario=this.ref.data.stockinventario
  this.cantidadanterior=this.ref.data.cantidad;
  this.idproducto=this.ref.data.idproducto;
  this.detalle=this.ref.data.detalle;
  
  console.log("asdasdasdasd",this.precioentrada)

  }


  async submitForm(){
    const diferenciacantidad=this.cantidad-this.cantidadanterior
    
   console.log("alskndaksdnlaksdholaas",this.cantidad,this.cantidadanterior,diferenciacantidad)
    if(this.cantidad>this.cantidadanterior|| this.cantidad == this.cantidadanterior) //esta disminuyendo, aumentamos a inventario
    {
      const nuevacantidad=this.cantidad-this.cantidadanterior //nuevacantidad aumenta a producto
      this.tipo=1 
      try {
        const response = this.entradasService.editarEntradas(this.identrada,this.cantidad,this.precioentrada,nuevacantidad,this.tipo,this.idproducto,this.detalle)
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
    else{
      const diferenciainventario=this.stockinventario+diferenciacantidad
      if(diferenciacantidad< 0 && diferenciainventario>0 ){

      
      console.log("dasdasdasdasdasdholos",this.stockinventario,this.cantidad)
     

        const nuevacantidad=this.cantidad-this.cantidadanterior //nuevacantidad disminuye a producto
        this.tipo=2
      
    try {
      const response = this.entradasService.editarEntradas(this.identrada,this.cantidad,this.precioentrada,nuevacantidad,this.tipo,this.idproducto,this.detalle)
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


    }else{
      
      this.confirmationService.confirm({
          
        message: 'No hay Suficientes Productos en Inventario para Aumentar, Seleccione otra cantidad',
        header: 'ATENCION!!',
        icon: 'pi pi-exclamation-triangle',
        acceptIcon:"none",
        rejectIcon:"none",
        acceptLabel: 'Aceptar', 
        rejectButtonStyleClass:"p-button-text",
        accept: () => {
            this.messageService.add({ severity: 'warn', summary: 'Cancelado', detail: 'Compruebe el la Cantidad' });
        },
        rejectVisible: false
        
    });

    }
        
   



  }
    
    

    
    

   

    
    
    




  }
  

  

}
