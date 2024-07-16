import { ChangeDetectorRef, Component } from '@angular/core';

import { Table } from 'primeng/table';
import { ModalserviceService } from '../services/modalservice.service';
import { NewproductComponent } from '../newproduct/newproduct.component';
import { DialogService } from 'primeng/dynamicdialog';
import { DialogModule } from 'primeng/dialog';
import { EditarProductoComponent } from '../editar-producto/editar-producto.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { VerProductoComponent } from '../ver-producto/ver-producto.component';
import { Subscription } from 'rxjs';
import { ProductoService } from '../services/producto.service';
import { EditarsubproductoComponent } from '../editarsubproducto/editarsubproducto.component';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent {

  suscripcion: Subscription;
  mensaje: string = '';

  products!: any;
  algo:number =0;
  allproductos:any;
  contador: number = 0; 
  urlImage:string= 'http://localhost:3000/upload/';
  files!: any[]; 
  constructor(
    private modalService: ModalserviceService,
    private dialogService: DialogService,
    private confirmationService: ConfirmationService, 
    private messageService: MessageService,
    private productoService: ProductoService,
    private cdRef: ChangeDetectorRef, 
  ) {
    
    this.suscripcion = this.modalService.obtenerMensaje().subscribe((mensaje) => {
      //  console.log("concluye el mensaje");
      this.traerProductos();
      this.cdRef.detectChanges();
      this.mensaje = mensaje;
      console.log(mensaje);
      });
  }

  ngOnInit() {
    this.traerProductos();
    

    
  }
  getSeverity(status: number): "success" | "warning" | "danger" | undefined {
    switch (true) {
        case status > 10 :
            return 'success';
        case status > 1 && status <10:
            return 'warning';
        case status == 0 || status == 1  :
            return 'danger';
        default:
            return undefined; // o algún valor por defecto que desees
    }
}


async traerProductos(){
  
  (await this.productoService.traerProductos()).subscribe({
    next: (data:any)=>{ 
     
      this.allproductos=data;


        
      this.files = this.allproductos.map((producto: any) => ({
        data: {
          idproducto: producto.idproducto,
          nombre: producto.nombre,
          descripcion: producto.descripcion,
          precio: producto.precio,
          codigo: producto.codigo,
          stock: producto.stock,
          cantidadvista: producto.cantidadvista,
          image: producto.image,
          created_at: producto.created_at,
          updated_at: producto.updated_at
        },
        children: producto.stockproductos.map((stockproducto: any, index: any) => ({
          data: {
            idstockproducto: stockproducto.idstockproducto,
            descripcion: stockproducto.descripcion,
            precio: stockproducto.precio,
            codigo: stockproducto.codigo,
            stock: stockproducto.stock,
            idproducto: stockproducto.idproducto,
            created_at: stockproducto.created_at,
            updated_at: stockproducto.updated_at,
            index: index + 1
          }
        }))
      }));


      console.log("aqui estan todos mis datos",this.allproductos)
      
  
  },
    complete: () => { }, // completeHandler
    error: (error) => { console.log('Este es el error', error)},    
         
});

await this.cdRef.detectChanges();
await this.allproductos.forEach((producto:any, index:any) => {
  producto.posicion = index + 1;
});
}


  agregarProducto(){
   const data = {header: 'Registro de Productos ',
    width: '45%',
    height: '70%',
    data:{
      algo:this.algo,
    }}
 this.modalService.openModal(data,NewproductComponent);
 



}
verProducto(idproducto:string){
  console.log("es mi id???", idproducto)
  const data = {header: 'Detalles Producto ',
   width: '45%',
   height: '65%',
   data:{
     idproducto:idproducto,
   }}
this.modalService.openModal(data,VerProductoComponent);




}


editarsubProducto(idproducto:string){
  const data = {header: 'Editar Producto ',
   width: '45%',
   height: '70%',
   data:{
    idproducto:idproducto,
   }}
this.modalService.openModal(data,EditarsubproductoComponent);




}
async eliminar(idproducto: string,stock:any) {
  if(stock===0){

    this.confirmationService.confirm({
      // target: event.target as EventTarget,
       message: 'Esta Seguro de Eliminar este Producto?',
       header: 'Confirmacion',
       icon: 'pi pi-exclamation-triangle',
       acceptIcon:"none",
       rejectIcon:"none",
       acceptLabel: 'Sí', 
       rejectLabel: 'No',
       rejectButtonStyleClass:"p-button-text",
       accept: async () => {
         await  this.productoService.deleteProducto(idproducto);
         await this.modalService.enviarMensaje('que se ejecute');
           this.messageService.add({ severity: 'info', summary: 'Confirmado!!', detail: 'El Producto se elimino con Exito' });
       },
       reject: () => {
           this.messageService.add({ severity: 'error', summary: 'Cancelado!!', detail: 'Se Cancelo la Eliminacion', life: 3000 });
       }
   });
 

  }  else{
    if(stock>0){

      await this.modalService.enviarMensaje('que se ejecute');
        this.messageService.add({ severity: 'error', summary: 'ATENCION!!', detail: 'Tiene Stock de Este producto no puede eliminarlo' });
    }
   }
  
}


formatearFecha(fecha: string): string {
  // Formato de la fecha deseado (YYYY-MM-DD HH:mm:ss)
  const partes = fecha.split('T');
  const fechaFormateada = partes[0] + ' ' + partes[1].split('.')[0]; // Elimina los milisegundos
  return fechaFormateada;
}


editarProducto(idproducto:string){
  const data = {header: 'Editar Producto ',
   width: '45%',
   height: '70%',
   data:{
    idproducto:idproducto,
   }}
this.modalService.openModal(data,EditarProductoComponent);




}


async eliminarsubProducto(idstockproducto: string,stock:any) {
  if(stock=== 0){
    this.confirmationService.confirm({
      // target: event.target as EventTarget,
       message: 'Esta Seguro de Eliminar este Sub Producto?',
       header: 'Confirmacion',
       icon: 'pi pi-exclamation-triangle',
       acceptIcon:"none",
       rejectIcon:"none",
       acceptLabel: 'Sí', 
       rejectLabel: 'No',
       rejectButtonStyleClass:"p-button-text",
       accept: async () => {
         await  this.productoService.deletesubProducto(idstockproducto);
         await this.modalService.enviarMensaje('que se ejecute');
           this.messageService.add({ severity: 'info', summary: 'Confirmado!!', detail: 'El SubProducto se elimino con Exito' });
       },
       reject: () => {
           this.messageService.add({ severity: 'error', summary: 'Cancelado!!', detail: 'Se Cancelo la Eliminacion', life: 3000 });
       }
   });

  }else{
    if(stock>0){

           await this.modalService.enviarMensaje('que se ejecute');
             this.messageService.add({ severity: 'error', summary: 'ATENCION!!', detail: 'Tiene Stock de Este Subproducto no puede eliminarlo' });
         }
      
  }
  
}




}
