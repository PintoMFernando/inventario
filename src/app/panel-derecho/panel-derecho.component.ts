import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { PanelesService } from '../services/paneles.service';
import { SalidasService } from '../services/salidas.service';
import { ModalserviceService } from '../services/modalservice.service';
import { ProformaComponent } from '../proforma/proforma.component';

@Component({
  selector: 'app-panel-derecho',
  templateUrl: './panel-derecho.component.html',
  styleUrls: ['./panel-derecho.component.css']
})
export class PanelDerechoComponent implements OnInit {
  datosAcumulados!: any[];
  
  constructor(
    private panelesService: PanelesService,
    private salidasService: SalidasService,
    private modalService: ModalserviceService,

  ) {}

  titulo: string = '';
  filas: any[] = [];

  ngOnInit() {
    this.panelesService.datosRecibidos$.subscribe(datos => {
      this.datosAcumulados = datos;
      console.log('Datos recibidos en el componente del segundo panel:', this.datosAcumulados);
    });
  }
 
  

  agregarFila() {
    this.filas.push({
      columna1: '',
      columna2: '',
      columna3: ''
    });
  }

  eliminar(idsalida:string,idproducto:string,cantidad:number) {
    console.log("el id de mi salida",idsalida)
    for (let i = 0; i < this.datosAcumulados.length; i++) {
      if (this.datosAcumulados[i].idsalida === idsalida) {
        this.datosAcumulados.splice(i, 1);
        this.eliminarenlDB(idsalida,idproducto,cantidad);
        break; // opcional, para detener el bucle después de encontrar y eliminar el elemento
      }
    }
    
    
  }

  async eliminarenlDB(idsalida:string,idproducto:string,cantidad:number){
         // await  this.salidasService.eliminarSalida(idsalida,idproducto,cantidad);
          await this.modalService.enviarMensaje(idproducto);
    }
 

  calcularTotal() {
    let total = 0;
  for (const dato of this.datosAcumulados) {
    total += dato.preciototal;
  }
  return total;
  }


  async generarproforma(arrayDatos:any){
    //idsalida:string,estado:number,nombre:string,ci:string,telefono:number,idproforma:string
  console.log("entra  ami boton generar")
  console.log("esta pasando??",arrayDatos)
  const data = {header: 'Formulario Proforma ',
 width: '50%',
 height: '65%',
 data:{
  
  misdatos:arrayDatos,

 }}
    this.modalService.openModal(data,ProformaComponent);
    await this.modalService.enviarMensajeSalidas('que se ejecute mi tabla salida');

  }


  


  

}
