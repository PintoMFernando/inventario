import { ChangeDetectorRef, Component, ChangeDetectionStrategy,ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { ModalserviceService } from '../services/modalservice.service';
import { DialogService } from 'primeng/dynamicdialog';
import { ProductoService } from '../services/producto.service';
import { EntradasService } from '../services/entradas.service';
import { EditarEntradaComponent } from '../editar-entrada/editar-entrada.component';
import { SalidasService } from '../services/salidas.service';
import { EditarSalidaComponent } from '../editar-salida/editar-salida.component';
import { ProformaComponent } from '../proforma/proforma.component';
import { EditarProformaComponent } from '../editar-proforma/editar-proforma.component';
import { ConfirmPopup } from 'primeng/confirmpopup';
import { ProformaService } from '../services/proforma.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminproforma',
  templateUrl: './adminproforma.component.html',
  styleUrls: ['./adminproforma.component.css'],
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminproformaComponent {

  
  

  products!: any;
  fechaDeHoy = new Date().toLocaleDateString('es-ES');

  panelItems: string[] = [];
  anios: any [] = [];
  tiporeporte:string="entrada";
  mes: any [] = [];
  selectanio: string | undefined;
  selectmes: string | undefined;
  allproductos:any;
  salidas!: any;
  suscripcion: Subscription;
  mensaje: string = '';
  estado: number=1;
  salidasproforma!: any;
  files!: any[];
  constructor(
    private modalService: ModalserviceService,
    private dialogService: DialogService,
    private confirmationService: ConfirmationService, 
    private messageService: MessageService,
    private productoService: ProductoService,
    private cdRef: ChangeDetectorRef, 
    private salidasService: SalidasService,
    private proformaService:ProformaService,
    private router: Router,
    
    
  ) {
    this.suscripcion = this.modalService.obtenerMensaje2().subscribe((mensaje) => {
      //  console.log("concluye el mensaje");
      //
      const date = new Date(mensaje);
      const anio = date.getUTCFullYear();
     const mes = date.getUTCMonth() + 1;
     this.buscar(anio,mes);
      //this.cdRef.detectChanges();
       this.cdRef.markForCheck();
      this.mensaje = mensaje;
      console.log("aqui hay un mensaje???",mensaje, anio, mes);
      });

  }

  ngOnInit() {
    //this.listarSalidas();
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

  
  async listarSalidas(){
    /*(await this.salidasService.traerSalidas()).subscribe({
      next: (data:any)=>{ 
       
        this.salidas=data;
        console.log("aqui estan todos mis datos entradas salidas",this.salidas)
        
    
    },
      complete: () => { }, // completeHandler
      error: (error) => { console.log('Este es el error', error)},    
           
  });
  
  await this.cdRef.detectChanges();
  await this.salidas.forEach((producto:any, index:any) => {
    producto.posicion = index + 1;
  });
*/
  }


  async editarProforma(idproforma:string,nombre:string,ci:string,telefono:number,fecha:any,estado:any){
    console.log("esta pasando??",nombre)
       const data = {header: 'Formulario Proforma ',
      width: '50%',
      height: '65%',
      data:{
       
       idproforma:idproforma,
       nombre:nombre,
       ci:ci,
       telefono:telefono,
       fecha:fecha,
       estado:estado,
      }}
   this.modalService.openModal(data,EditarProformaComponent);
   
   
   
   
   
   
     }

  async eliminar(idsalida:string,nombreProducto:string,idproducto:string,cantidad:number){
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
         await this.modalService.enviarMensaje('que se ejecute');
         this.messageService.add({ severity: 'info', summary: 'Confirmado!!', detail: 'La salida del Producto se elimino con Exito' });
        },
        reject: () => {
            this.messageService.add({ severity: 'error', summary: 'Cancelado!!', detail: 'Se Cancelo la Eliminacion', life: 3000 });
        }
    });
    
 
   }


async proforma(idsalida:string,estado:number,nombre:string,ci:string,telefono:number){
  console.log("esta pasando?? o no gato ",nombre)
     const data = {header: 'Formulario Proforma ',
    width: '50%',
    height: '65%',
    data:{
     
     idsalida:idsalida,
     estado:estado,
     nombre:nombre,
     ci:ci,
     telefono:telefono,
   
     
   
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


async buscar(anio:any,mes:any){

  if (!anio || !mes) {
    console.error('Año o mes no definidos');
    return;
  }

  console.log("hola mis mes y anio",anio, mes)
  await this.cdRef.markForCheck();
  //await this.cdRef.detectChanges();
   (await this.salidasService.traerProformaFecha(anio,mes)).subscribe({
    next: (data:any)=>{ 
     
      if(data!==null){
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
              producto: salida.idsalidas 
            }
          }))
        }));
  
            console.log("mis files transofrmados",this.files)
  
      }
      
      
  
  },
    complete: () => { }, // completeHandler
    error: (error) => { console.log('Este es el error', error)},    
         
});

//await this.cdRef.detectChanges();
await this.salidas.forEach((producto:any, index:any) => {
  producto.posicion = index + 1;
});
//await this.cdRef.detectChanges();
await this.cdRef.markForCheck();  
}

  formatearFecha(fecha: string): string {
    // Formato de la fecha deseado (YYYY-MM-DD HH:mm:ss)
    const partes = fecha.split('T');
    const fechaFormateada = partes[0] + ' ' + partes[1].split('.')[0]; // Elimina los milisegundos
    return fechaFormateada;
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
  await this.router.navigate(['/proforma',idproforma]);
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
            producto: salida.idsalidas 
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


 

 
async editarSalida(nombreproducto:string,idsalida:string,cantidad:number,preciototal:number,preciosalida:number,stockInventario:number,idproducto:string,descuento:number){

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




}
