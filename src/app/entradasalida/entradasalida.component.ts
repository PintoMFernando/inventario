import { ChangeDetectorRef, Component } from '@angular/core';
import { ModalserviceService } from '../services/modalservice.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { ProductoService } from '../services/producto.service';
import { EntradasService } from '../services/entradas.service';
import { format } from 'date-fns';
import { Subscription } from 'rxjs';
import { EditarEntradaComponent } from '../editar-entrada/editar-entrada.component';

@Component({
  selector: 'app-entradasalida',
  templateUrl: './entradasalida.component.html',
  styleUrls: ['./entradasalida.component.css']
})
export class EntradasalidaComponent {

  products!: any;
  entradas!: any;
  algo:number =0;
  suscripcion: Subscription;
  mensaje: string = '';

  constructor(
    
    private confirmationService: ConfirmationService, 
    private messageService: MessageService,
    private modalService: ModalserviceService,
    private dialogService: DialogService,
    private productoService: ProductoService,
    private cdRef: ChangeDetectorRef,
    private entradasService:EntradasService,
    
  ) {
    this.suscripcion = this.modalService.obtenerMensaje().subscribe((mensaje) => {
      //  console.log("concluye el mensaje");
      this.listarEntradas();
      this.traerProductos();
      this.cdRef.detectChanges();
      this.mensaje = mensaje;
      console.log(mensaje);
      });
  }

  allproductos:any;
   fechaDeHoy = new Date().toLocaleDateString('es-ES');
  
  
   

  ngOnInit() {

      this.traerProductos();
      this.listarEntradas();
      
  
      
    
   

  }

  async traerProductos(){
  
    (await this.productoService.traerProductos()).subscribe({
      next: (data:any)=>{ 
       
        this.allproductos=data;
        console.log("aqui estan todos mis datos entradas salidas",this.allproductos)
        
    
    },
      complete: () => { }, // completeHandler
      error: (error) => { console.log('Este es el error', error)},    
           
  });
  
  await this.cdRef.detectChanges();
  await this.allproductos.forEach((producto:any, index:any) => {
    producto.posicion = index + 1;
  });
  }

  

  async agregarVenta(idproducto:string,nombreProducto:string,cantidad:any, precio:any,detalle:string){
    console.log("que es esto??",idproducto,cantidad)
      this.confirmationService.confirm({
         // target: event.target as EventTarget,
          message: 'Esta Seguro de Agregar '+ cantidad + ' unidades de ' + nombreProducto+'?',
          header: 'Confirmacion',
          icon: 'pi pi-exclamation-triangle',
          acceptIcon:"none",
          rejectIcon:"none",
          acceptLabel: 'Sí', 
          rejectLabel: 'No',
          rejectButtonStyleClass:"p-button-text",
          accept: async () => {
              await this.entradasService.agregarEntradas(idproducto,cantidad,precio,detalle);
              await this.modalService.enviarMensaje('que se ejecute');
              await this.cdRef.detectChanges();
              this.messageService.add({ severity: 'info', summary: 'Confirmado!!', detail: 'El Producto se Agrego hoy con Exito' });
          },
          reject: () => {
              this.messageService.add({ severity: 'error', summary: 'Cancelado!!', detail: 'Se Cancelo la Operacion', life: 3000 });
          }
      });
    

  }

  async listarEntradas(){
  
    (await this.entradasService.traerEntradas()).subscribe({
      next: (data:any)=>{ 
       
        this.entradas=data;
        console.log("aqui estan todos mis datos entradas salidas",this.entradas)
        
    
    },
      complete: () => { }, // completeHandler
      error: (error) => { console.log('Este es el error', error)},    
           
  });
  
  await this.cdRef.detectChanges();
  await this.entradas.forEach((producto:any, index:any) => {
    producto.posicion = index + 1;
  });
  }


  async editarProducto(nombreproducto:string,identrada:string,cantidad:number,precioentrada:number,stockinventario:number,idproducto:string,detalle:string,preciototal:number){
 console.log("auqie est ami prcioi totla??",preciototal)
    const data = {header: 'Editar Entrada ',
   width: '50%',
   height: '65%',
   data:{
    nombreproducto:nombreproducto,
    identrada:identrada,
    cantidad:cantidad,
    precioentrada:precioentrada,
    stockinventario:stockinventario,
    idproducto:idproducto,
    detalle:detalle,
    preciototal:preciototal,
   }}
this.modalService.openModal(data,EditarEntradaComponent);






  }

  async eliminar(identrada:string,nombreProducto:string,idproducto:string,cantidad:number){
   // this.entradasService.eliminarEntrada(identrada);

    this.confirmationService.confirm({
      // target: event.target as EventTarget,
       message: 'Esta Seguro de Eliminar '+ nombreProducto + ' como Entrada?' +' No podra Recuperarla.',
       header: 'Confirmacion',
       icon: 'pi pi-exclamation-triangle',
       acceptIcon:"none",
       rejectIcon:"none",
       acceptLabel: 'Sí', 
       rejectLabel: 'No',
       rejectButtonStyleClass:"p-button-text",
       accept: async () => {
         await  this.entradasService.eliminarEntrada(identrada,idproducto,cantidad);
         await this.modalService.enviarMensaje('que se ejecute');
           this.messageService.add({ severity: 'info', summary: 'Confirmado!!', detail: 'La entrada del Producto se elimino con Exito' });
       },
       reject: () => {
           this.messageService.add({ severity: 'error', summary: 'Cancelado!!', detail: 'Se Cancelo la Eliminacion', life: 3000 });
       }
   });
   

  }





}
