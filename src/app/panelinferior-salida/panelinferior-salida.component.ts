import { ChangeDetectorRef, Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { ProductoService } from '../services/producto.service';
import { SalidasService } from '../services/salidas.service';
import { ProformaService } from '../services/proforma.service';
import { ModalserviceService } from '../services/modalservice.service';
import { Router } from '@angular/router';
import { PanelesService } from '../services/paneles.service';
import { v4 as uuidv4 } from 'uuid';
import { EditarSalidaComponent } from '../editar-salida/editar-salida.component';
import { ProformaComponent } from '../proforma/proforma.component';
import { EditarProformaComponent } from '../editar-proforma/editar-proforma.component';
@Component({
  selector: 'app-panelinferior-salida',
  templateUrl: './panelinferior-salida.component.html',
  styleUrls: ['./panelinferior-salida.component.css']
})
export class PanelinferiorSalidaComponent {

  products!: any;
  salidasproforma!: any;
  algo:number =0;
  fechaDeHoy = new Date().toLocaleDateString('es-ES');
  allproductos:any;
  cantidadAComprar: number = 0;
  descuento: number = 0;
  suscripcionsalidas: Subscription;
  mensaje: string = '';
  estado:any;
  selecestado: string | undefined;
  idsalida:string="" ;
  stateOptions: any[] = [{ label: 'Valido', value: '1' },{ label: 'Anulado', value: '2' }];
    value: string = '1';
    datosParaEnviar: string ="holos gato";
    files!: any[];  
  constructor(
    
    private confirmationService: ConfirmationService, 
    
    private messageService: MessageService,
    private productoService: ProductoService,
    private cdRef: ChangeDetectorRef,
    private salidasService: SalidasService,
    private prtoformaService: ProformaService,
    private modalService: ModalserviceService,
    private router: Router,
    private panelesService: PanelesService,
    private proformaService:ProformaService
  ) {
    
    this.suscripcionsalidas = this.modalService.obtenerMensajeSalidas().subscribe((mensaje) => {
      console.log("concluye el mensaje de salidas");
      this.listarSalidasProforma();
      this.cdRef.detectChanges();
      this.mensaje = mensaje;
      console.log(mensaje);
      });
  
  }

   

  ngOnInit() {
   

    
    this.listarSalidasProforma();
    

   

  }

  
  
  getPrecioTotal(precio:number,cantidad:number,descuento:number): number {
    return (precio * cantidad)-descuento;
  }

  async listarSalidasProforma(){
    (await this.salidasService.traerSalidasProforma()).subscribe({
      next: (data:any)=>{ 
       
        this.salidasproforma=data; //aqui aumento la cosa
        
        this.files = this.salidasproforma.map((proforma:any)=> ({
          data: {
            idproforma: proforma.idproforma,
            nombre: proforma.nombre,
            ci: proforma.ci,
            telefono: proforma.telefono,
            estado: proforma.estado,
            tipo: proforma.tipo,
            codigo: proforma.codigo,
            created_at: proforma.created_at,
            updated_at: proforma.updated_at
          },
          children: proforma.salidas.map((salida:any,index:any) => ({
            data: {
              idsalida: salida.idsalida,
              cantidad: salida.cantidad,
              preciosalida: salida.preciosalida,
              preciototal: salida.preciototal,
              descuento: salida.descuento,
              idproducto: salida.idproducto,
              created_at: salida.created_at,
              updated_at: salida.updated_at,
              index: index + 1,
              producto: salida.idsalidas, 
              idstockproducto:salida.idstockproducto,
              
            }
          }))
        }));

            console.log("mis files transofrmados",this.files)











        console.log("aqui estan todos mis datos entradas salidas",this.salidasproforma)
        
    
    },
      complete: () => { }, // completeHandler
      error: (error) => { console.log('Este es el error', error)},    
           
  });
  
  await this.cdRef.detectChanges();
  await this.salidasproforma.forEach((producto:any, index:any) => {
    producto.posicion = index + 1;
  });

  }


  async editarProducto(nombreproducto:string,idsalida:string,cantidad:number,preciototal:number,preciosalida:number,stockInventario:number,idproducto:string,descuento:number){

    const data = {header: 'Editar Salida ',
   width: '50%',
   height: '65%',
   data:{
    nombreproducto:nombreproducto,
    idsalida:idsalida,
    cantidad:cantidad,
    preciototal:preciototal,
    preciosalida:preciosalida,
    stockInventario:stockInventario,
    idproducto:idproducto,
    descuento:descuento,
   }}
this.modalService.openModal(data,EditarSalidaComponent);






  }

 



   async proforma(idsalida:string,estado:number,nombre:string,ci:string,telefono:number,idproforma:string){
 console.log("esta pasando??",nombre)
    const data = {header: 'Formulario Proforma ',
   width: '50%',
   height: '65%',
   data:{
    
    idsalida:idsalida,
    estado:estado,
    nombre:nombre,
    ci:ci,
    telefono:telefono,
    idproforma:idproforma
  
   }}
this.modalService.openModal(data,ProformaComponent);






  }


  getEstadoText(estado: number | null | undefined): string {
    switch (estado) {
      case 1:
        return 'Valido';
      case 2:
        return 'Anulado';
      
      default:
        return 'Desconocido'; // Opcional, por si hay otro valor que no se espere
    }
  }
  
  getSeverity(estado: number | null | undefined): string {
    switch (estado) {
      
      case 1:
        return 'success';
      case 2:
        return 'danger';
      default:
        return 'warning'; // Opcional, por si hay otro valor que no se espere
    }
  }


  formatearFecha(fecha: string): string {
    // Formato de la fecha deseado (YYYY-MM-DD HH:mm:ss)
    const partes = fecha.split('T');
    const fechaFormateada = partes[0] + ' ' + partes[1].split('.')[0]; // Elimina los milisegundos
    return fechaFormateada;
  }

  editarProforma(idproforma:string,nombre:string,ci:string,telefono:number,estado:any){

    
      console.log("esta pasando??",nombre)
         const data = {header: 'Formulario Proforma ',
        width: '50%',
        height: '65%',
        data:{
         
         idproforma:idproforma,
         nombre:nombre,
         ci:ci,
         telefono:telefono,
         estado:estado,
         
        }}
     this.modalService.openModal(data,EditarProformaComponent);
     
     
     
     
     
 

  }


 
  async editarSalida(nombreproducto:string,idsalida:string,cantidad:number,preciototal:number,preciosalida:number,stockInventario:number,idproducto:string,descuento:number,idstockproducto:string){

    const data = {header: 'Editar Salida ',
   width: '50%',
   height: '65%',
   data:{
    nombreproducto:nombreproducto,
    idsalida:idsalida,
    cantidad:cantidad,
    preciototal:preciototal,
    preciosalida:preciosalida,
    stockInventario:stockInventario,
    idproducto:idproducto,
    descuento:descuento,
    idstockproducto:idstockproducto,
   }}
this.modalService.openModal(data,EditarSalidaComponent);






  }



  async eliminarSalida(idsalida:string,nombreProducto:string,idproducto:string,cantidad:number){
    // this.entradasService.eliminarEntrada(identrada);
 
     this.confirmationService.confirm({
       // target: event.target as EventTarget,
        message: 'Esta Seguro de Eliminar '+ nombreProducto + ' como Salida?' +' No podra Recuperarla.',
        header: 'Confirmacion',
        icon: 'pi pi-exclamation-triangle',
        acceptIcon:"none",
        rejectIcon:"none",
        acceptLabel: 'Sí', 
        rejectLabel: 'No',
        rejectButtonStyleClass:"p-button-text",
        accept: async () => {
          await  this.salidasService.eliminarSalida(idsalida,idproducto,cantidad);
          await this.modalService.enviarMensajeSalidas('que se ejecute');
          this.messageService.add({ severity: 'info', summary: 'Confirmado!!', detail: 'La salida del Producto se elimino con Exito' });
         },
         reject: () => {
             this.messageService.add({ severity: 'error', summary: 'Cancelado!!', detail: 'Se Cancelo la Eliminacion', life: 3000 });
         }
     });
     
  
    }
 


  confirm1(event: Event, idproforma: any,estado:number,fecha:any) {
    this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Esta seguro de REVERTIR La Anulacion?',
        icon: 'pi pi-exclamation-triangle',
        accept: async () => {
            await this.proformaService.editarProformaestado(idproforma,estado)
            
            await this.modalService.enviarMensaje2(fecha);
            await this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Se revirtio la Anulaicon con Exito!', life: 3000 });
        },
        reject: async () => {
          await this.modalService.enviarMensaje2(fecha);
            await this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'Se cancelo la Operacion', life: 3000 });
        },
        
    });
}

confirm2(event: Event, idproforma: any,estado:number,fecha:any) {
    this.confirmationService.confirm({
       target: event.target as EventTarget,
        message: 'Esta seguro de querer anular el Proforma??',
        icon: 'pi pi-info-circle',
        acceptButtonStyleClass: 'p-button-danger p-button-sm',
        accept: async () => {
          await this.proformaService.editarProformaestado(idproforma,estado)
          
          await this.modalService.enviarMensaje2(fecha);
          await  this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Se anulo la Proforma con Exito!', life: 3000 });
        },
        reject: async () => {
          await this.modalService.enviarMensaje2(fecha);
          await   this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'Se Cancelo la Anulacion', life: 3000 });
        }
    });
}

  

 async generarProforma(idproforma:string){
    //idsalida:string,estado:number,nombre:string,ci:string,telefono:number,idproforma:string
  
    await this.router.navigate(['/proforma',idproforma]);

  }


  
  
}
