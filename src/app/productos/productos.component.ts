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


editarProducto(idproducto:string){
  const data = {header: 'Editar Producto ',
   width: '45%',
   height: '70%',
   data:{
    idproducto:idproducto,
   }}
this.modalService.openModal(data,EditarProductoComponent);




}
async eliminar(idproducto: string) {
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
}

}
