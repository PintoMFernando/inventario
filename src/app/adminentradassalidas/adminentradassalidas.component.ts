import { ChangeDetectorRef, Component,ChangeDetectionStrategy, OnInit, } from '@angular/core';
import { ModalserviceService } from '../services/modalservice.service';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ProductoService } from '../services/producto.service';
import { SalidasService } from '../services/salidas.service';
import { EditarSalidaComponent } from '../editar-salida/editar-salida.component';
import { EditarEntradaComponent } from '../editar-entrada/editar-entrada.component';
import { EntradasService } from '../services/entradas.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-adminentradassalidas',
  templateUrl: './adminentradassalidas.component.html',
  styleUrls: ['./adminentradassalidas.component.css'],
 // changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminentradassalidasComponent implements OnInit{

  
  products!: any;
  entradas: any[] = [];
  mes: any[] = []; 
  anios: any[] = [];
  algo:string ="";
  suscripcion: Subscription;
  mensaje: string = '';
  selectanio: string | undefined;
  selectmes: string | undefined;

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
        console.log("concluye el mensaje");
      
      this.cdRef.detectChanges();
      //this.cdRef.markForCheck();
      this.mensaje = mensaje;
      console.log(mensaje);
      });
  }

  allproductos:any;
   fechaDeHoy = new Date().toLocaleDateString('es-ES');
  
  
   

  ngOnInit() {

      //this.buscar(2024,4)
      
      this.anios = [
        { anio: '2024' ,value: 2024 },
        { anio: '2025',value: 2025  },
        { anio: '2026',value: 2026  },
        { anio: '2027',value: 2027  },
        { anio: '2028',value: 2028  },
        { anio: '2029',value: 2029  },
        { anio: '2030',value: 2030  },
        { anio: '2031',value: 2031  },
        { anio: '2032',value: 2032  },
        { anio: '2033',value: 2033  },
        { anio: '2034',value: 2034  },
        { anio: '2035',value: 2035  },
        { anio: '2036',value: 2036  },
        { anio: '2037',value: 2037  },
        { anio: '2038',value: 2038  },
        { anio: '2039' ,value: 2038 },
        { anio: '2040',value: 2040  },
  
        
    ];
    this.mes = [
      { mes: 'Enero', value: 1 },
      { mes: 'Febrero', value: 2 },
      { mes: 'Marzo', value: 3 },
      { mes: 'Abril', value: 4 },
      { mes: 'Mayo', value: 5 },
      { mes: 'Junio', value: 6 },
      { mes: 'Julio', value: 7 },
      { mes: 'Agosto', value: 8 },
      { mes: 'Septiembre', value: 9 },
      { mes: 'Octubre', value: 10 },
      { mes: 'Noviembre', value: 11 },
      { mes: 'Diciembre', value: 12 },
     
  ];
      
  this.selectanio = this.anios[0].value;
  this.selectmes = this.mes[0].value;
      
    
   

  }

 
  

  async agregarVenta(idproducto:string,nombreProducto:string,cantidad:any, precio:any,detalle:string){
    console.log("que es esto??",idproducto,cantidad)
    const precioTotal=cantidad*precio;
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
              await this.entradasService.agregarEntradas(idproducto,cantidad,precio,detalle,precioTotal);
              await this.modalService.enviarMensaje('que se ejecute');
              await this.cdRef.detectChanges();
              this.messageService.add({ severity: 'info', summary: 'Confirmado!!', detail: 'El Producto se Agrego hoy con Exito' });
          },
          reject: () => {
              this.messageService.add({ severity: 'error', summary: 'Cancelado!!', detail: 'Se Cancelo la Operacion', life: 3000 });
          }
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

  async buscar(anio: any | undefined, mes: any | undefined){
    console.error("este es mi anio y mes",anio,mes);
    if (!anio || !mes) {
      console.error('Año o mes no definidos');
      return;
    }
  this.algo="gooloo";
  // this.cdRef.markForCheck();
  await this.cdRef.detectChanges();
   (await this.entradasService.traerEntradasFecha(anio,mes)).subscribe({
    next: (data:any)=>{ 
     
      this.entradas=data;
      console.log("QUE ES TODO ESTOOOOO????????",this.entradas,this.entradas[0].entrada_cantidad)
      
  
  },
    complete: () => { }, // completeHandler
    error: (error) => { console.log('Este es el error', error)},    
         
});

//await this.cdRef.detectChanges();
await this.entradas.forEach((producto:any, index:any) => {
  producto.posicion = index + 1;
});
//await this.cdRef.markForCheck();
await this.cdRef.detectChanges();
  }






}
