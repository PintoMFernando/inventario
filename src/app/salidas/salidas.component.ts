import { ChangeDetectorRef, Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ProductoService } from '../services/producto.service';
import { SalidasService } from '../services/salidas.service';
import { ModalserviceService } from '../services/modalservice.service';
import { Subscription } from 'rxjs';
import { EditarSalidaComponent } from '../editar-salida/editar-salida.component';
import { FormGroup } from '@angular/forms';
import { ProformaComponent } from '../proforma/proforma.component';
import { ProformaService } from '../services/proforma.service';
import { v4 as uuidv4 } from 'uuid';
import { Router } from '@angular/router';
import { PanelesService } from '../services/paneles.service';
@Component({
  selector: 'app-salidas',
  templateUrl: './salidas.component.html',
  styleUrls: ['./salidas.component.css']
})
export class SalidasComponent {

  
  products!: any;
  salidas!: any;
  algo:number =0;
  fechaDeHoy = new Date().toLocaleDateString('es-ES');
  allproductos:any;
  cantidadAComprar: number = 0;
  descuento: number = 0;
  suscripcion: Subscription;
 
  mensaje: string = '';
  estado:any;
  selecestado: string | undefined;
  idsalida:string="" ;
  stateOptions: any[] = [{ label: 'Valido', value: '1' },{ label: 'Anulado', value: '2' }];
    value: string = '1';
    datosParaEnviar: string ="holos gato";

    selectedPrecio: number =0;
    selectedStock: number =0;
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
  ) {
    this.suscripcion = this.modalService.obtenerMensaje().subscribe((mensaje) => {
      console.log("entra a mi tabla productos???x");
      this.cantidadAComprar=0;
      this.descuento=0;
      this.getStock(mensaje,this.cantidadAComprar,this.descuento)
      this.onCantidadChange(mensaje)
   // this.listarSalidas();
    //this.traerProductos();
    this.cdRef.detectChanges();
    this.mensaje = mensaje;
    console.log(mensaje);
    });

    
  
  }

   

  ngOnInit() {
   

    this.traerProductos();
    //this.listarSalidas();
    

   

  }

  async traerProductos(){
  
    (await this.productoService.traerProductos()).subscribe({
      next: (data:any)=>{ 
       
        this.allproductos=data;
        console.log("aqui estan todos mis datos salidas",this.allproductos)

        if (this.allproductos.stockproductos.length > 0) {
          this.selectedPrecio = this.allproductos.stockproductos[0].precio;
          this.selectedStock = 0; // Suponiendo que el índice del primer producto es 0
        }
        
    
    },
      complete: () => { }, // completeHandler
      error: (error) => { console.log('Este es el error', error)},    
           
  });
  
  await this.cdRef.detectChanges();
  await this.allproductos.forEach((producto:any, index:any) => {
    producto.posicion = index + 1;
  });
  }



  async agregarSalida(idproducto:string,precioProducto:number, cantidad:any, stockInventario:number,descuento:number,nombre:string,idstockproducto:string){

    
    precioProducto=this.selectedPrecio 
    console.log("aqui estan todas mis datos?",idproducto,precioProducto,cantidad,stockInventario)
    console.log("MI STOCK",stockInventario)
    if(cantidad > stockInventario){
      this.confirmationService.confirm({
          
        message: 'No hay Suficientes Productos en Inventario para la Salida, Seleccione otra cantidad',
        header: 'ATENCION!!',
        icon: 'pi pi-exclamation-triangle',
        acceptIcon:"none",
        rejectIcon:"none",
        acceptLabel: 'Aceptar', 
        rejectButtonStyleClass:"p-button-text",
        accept: () => {
            this.messageService.add({ severity: 'warn', summary: 'Cancelado', detail: 'Compruebe el Producto' });
        },
        rejectVisible: false
        
    });
    }else{
      const preciototal= (precioProducto*cantidad)-descuento;
      
     await  this.confirmationService.confirm({
          
        message: 'Esta Seguro de Realizar esta Salida?',
        header: 'Confirmacion',
        icon: 'pi pi-exclamation-triangle',
        acceptIcon:"none",
        rejectIcon:"none",
        acceptLabel: 'Sí', 
        rejectLabel: 'No',
        rejectButtonStyleClass:"p-button-text",
        accept: async () => {
          this.idsalida=uuidv4();
          const datos = {
            nombre:nombre,
            idsalida: this.idsalida,
            idproducto: idproducto,
            precioProducto: precioProducto,
            cantidad:cantidad,
            preciototal:preciototal,
            descuento:descuento,
            idstockproducto:idstockproducto
          };
          await this.panelesService.enviarDatos(datos);
          //await this.salidasService.agregarSalidas(this.idsalida,idproducto,precioProducto,cantidad,preciototal,descuento); //esperar para mandar a la db
          //await this.router.navigate(['/proforma', this.idsalida,nombre,ci,telefono]);
          // await this.prtoformaService.agregarProforma(this.idsalida)
           //await this.modalService.enviarMensaje('actualizar pagina');
            this.messageService.add({ severity: 'info', summary: 'Confirmado!!', detail: 'Se realizo una Salida con Exito' });
        },
        reject: () => {
            this.messageService.add({ severity: 'error', summary: 'Cancelado!!', detail: 'Se Cancelo la Operacion', life: 3000 });
        }
    });


    }
     
    

  }

  getPrecioTotal(precio:number,cantidad:number,descuento:number): number {
    console.log("esto es precio y cantidad",precio,cantidad)
    return (precio * cantidad)-descuento;
  }

  getStock(idproducto:string,stock:number,cantidad:number): any {
    
      console.log("es el stock mens laa cantidad",stock,cantidad)
      return (stock - cantidad);
   
    
  }

  onCantidadChange(idproducto:string){
  console.log("entraaaaaaaaaaaaaaaaaaaaaaaaaaaaaaadadad",idproducto)
    const producto = this.allproductos.find((p:any)=> p.idproducto === idproducto);
    //if(producto){
      return producto.cantidadvista=0;
    //}

  }

  async listarSalidas(){
   /* (await this.salidasService.traerSalidas()).subscribe({
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


  formatearFecha(fecha: string): string {
    // Formato de la fecha deseado (YYYY-MM-DD HH:mm:ss)
    const partes = fecha.split('T');
    const fechaFormateada = partes[0] + ' ' + partes[1].split('.')[0]; // Elimina los milisegundos
    return fechaFormateada;
  }



  manejarDatosEnviados(datos: any) {
    // Aquí puedes realizar cualquier acción con los datos recibidos del componente hijo
    console.log('Datos recibidos en el componente padre:', datos);
  }

  onPrecioChange(event: any) {
    console.log("MI evet",    event)
    this.selectedPrecio = event.target.value;
  
    this.selectedStock = event.target.selectedIndex-1;

    console.log("mi precio seleccionado y mi estock seleccionado",    this.selectedPrecio,this.selectedStock )
    
    return  this.selectedPrecio,this.selectedStock
    
  }
  calcularVIsta(precio: number) {
    

  }

  

}
