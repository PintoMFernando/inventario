import { ChangeDetectorRef, Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ModalserviceService } from '../services/modalservice.service';
import { SalidasService } from '../services/salidas.service';

@Component({
  selector: 'app-editar-salida',
  templateUrl: './editar-salida.component.html',
  styleUrls: ['./editar-salida.component.css']
})
export class EditarSalidaComponent {


  
  idsalida:string ="";
  preciototal:number =0;
  preciosalida:number =0;
  cantidad:number =0;
  nombreproducto:string ="";
  stockinventario:number=0;
  cantidaeditable:number=0;
  idproducto:string ="";
   cantidadanterior:number=0;


  

  constructor(
    public ref: DynamicDialogConfig,
    private cdRef: ChangeDetectorRef, 
    private messageService: MessageService, 
    private modalService:ModalserviceService,
    private salidasService: SalidasService,
    private confirmationService: ConfirmationService, 

  )
  {}


  ngOnInit() {
    this.editarEntrada();
    

    
  }

  async editarEntrada(){
    this.idsalida=this.ref.data.idsalida;
  this.preciototal=this.ref.data.preciototal;
  this.preciosalida=this.ref.data.preciosalida;
  this.cantidad=this.ref.data.cantidad;
  this.nombreproducto=this.ref.data.nombreproducto;
  this.stockinventario= this.ref.data.stockInventario;
  this.cantidadanterior=this.ref.data.cantidad;
  this.idproducto=this.ref.data.idproducto;
  console.log("alskndaksdnlaksdholaasholooos",this.idsalida)
  }


  async submitForm(){
    const diferenciacantidad=this.cantidad-this.cantidadanterior
    console.log("alskndaksdnlaksdholaas",this.cantidad,this.cantidadanterior,diferenciacantidad,this.preciosalida)
    if(this.cantidad>this.cantidadanterior || this.cantidad == this.cantidadanterior) //esta disminuyendo, aumentamos a inventario
    {
      const nuevacantidad=this.cantidad-this.cantidadanterior //nuevacantidad aumenta a producto
      //this.tipo=1 
      try {
        const preciototal= this.preciosalida-this.cantidad
        const response = this.salidasService.editarSalidas(this.idsalida,this.cantidad,preciototal,this.preciosalida,nuevacantidad,this.idproducto)
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
       // this.tipo=2
      
    try {
      const preciototal= this.preciosalida-this.cantidad
      const response = this.salidasService.editarSalidas(this.idsalida,this.cantidad,preciototal,this.preciosalida,nuevacantidad,this.idproducto)
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
  

  getPrecioTotal(precio:number,cantidad:number): number {
    return precio * cantidad;
  }

  
  
}
