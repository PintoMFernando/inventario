import { ChangeDetectorRef, Component } from '@angular/core';
import { EditarSalidaComponent } from '../editar-salida/editar-salida.component';
import { ModalserviceService } from '../services/modalservice.service';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ProductoService } from '../services/producto.service';
import { SalidasService } from '../services/salidas.service';
import { ProformaComponent } from '../proforma/proforma.component';

@Component({
  selector: 'app-adminsalidas',
  templateUrl: './adminsalidas.component.html',
  styleUrls: ['./adminsalidas.component.css']
})
export class AdminsalidasComponent {

  
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
  constructor(
    private modalService: ModalserviceService,
    private dialogService: DialogService,
    private confirmationService: ConfirmationService, 
    private messageService: MessageService,
    private productoService: ProductoService,
    private cdRef: ChangeDetectorRef, 
    private salidasService: SalidasService,
  ) {}

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

    
  }

  
  async listarSalidas(){
    (await this.salidasService.traerSalidas()).subscribe({
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
   
    }}
 this.modalService.openModal(data,ProformaComponent);
 
 
 
 
 
 
   }



getEstadoText(estado: number | null | undefined): string {
  switch (estado) {
    case 1:
      return 'Normal';
    case 2:
      return 'Válido';
    case 3:
      return 'Anulado';
    default:
      return 'Desconocido'; // Opcional, por si hay otro valor que no se espere
  }
}

getSeverity(estado: number | null | undefined): string {
  switch (estado) {
    case 1:
      return 'info'; // Puedes ajustar esto según tu preferencia
    case 2:
      return 'success';
    case 3:
      return 'danger';
    default:
      return 'warning'; // Opcional, por si hay otro valor que no se espere
  }
}

async buscar(anio:any,mes:any){
  console.log("hola mis mes y anio",anio, mes)
  await this.cdRef.detectChanges();
   (await this.salidasService.traerSalidasFecha(anio,mes)).subscribe({
    next: (data:any)=>{ 
     
      if(data!==null){
        this.salidas=data;
        console.log("mis datos de dslidas entra??",this.salidas)
      }
      
      
  
  },
    complete: () => { }, // completeHandler
    error: (error) => { console.log('Este es el error', error)},    
         
});

await this.cdRef.detectChanges();
await this.salidas.forEach((producto:any, index:any) => {
  producto.posicion = index + 1;
});
await this.cdRef.detectChanges();
  }





}
