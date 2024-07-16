import { Component } from '@angular/core';
import { ReportediaService } from '../services/reportedia.service';
import { ActivatedRoute } from '@angular/router';
import { SalidasService } from '../services/salidas.service';
import { lastValueFrom } from 'rxjs';
import { ProformaService } from '../services/proforma.service';

@Component({
  selector: 'app-proformaimp',
  templateUrl: './proformaimp.component.html',
  styleUrls: ['./proformaimp.component.css']
})
export class ProformaimpComponent {

  constructor(
   
    private route: ActivatedRoute,
    private salidaService: SalidasService,
    private proformaService: ProformaService
    
   

) {
}
fecha!:Date;
fechaDeHoy = new Date().toLocaleDateString('es-ES');
fechacorta:any;
idsalida:any;
nombre:any;
ci:any;
telefono:any
misdatos:any;
idproforma:any;
datosproforma:any
sumaPreciosalida: number = 0;
sumadesceunto: number = 0;
sumaTotal: number = 0;
tipoproforma:number =0;

  ngOnInit() { 
 

  
    this.idproforma=this.route.snapshot.params['idproforma'];
    
   
   // this.fechacorta = this.fecha!.toISOString().slice(0, 10);
    
   this.traerdatos()
  
    console.log("llegan mis datos ooo????????",this.idproforma,this.nombre,this.ci,this.telefono)
    //this.generarReporte();
  }

  async traerdatos(){

    const source$ = this.proformaService.traerunProforma(this.idproforma); //con esto traigo el id
    const data:any = await lastValueFrom(source$);
    this.datosproforma=data
    this.tipoproforma=data.tipo;

    console.log("este es mi data de mi proforma ", data,this.tipoproforma)
   await this.calculosubtotal();
   await this.calculodescuento();
   await this.calculototal();

    



  }

  calculosubtotal(){
    
    
    for (let salida of this.datosproforma.salidas) {
      this.sumaPreciosalida += salida.preciototal;
    }
    
  }

  calculodescuento(){

    
    for (let salida of this.datosproforma.salidas) {
      this.sumadesceunto += salida.descuento;
    }
    

  }
  calculototal(){
    /*for (let salida of this.datosproforma.salidas) {
      this.sumaPreciosalida = this.sumaPreciosalida+salida.preciototal;
    }*/

  /*  for (let salida of this.datosproforma.salidas) {
      this.sumadesceunto += salida.descuento;
    }
*/
    this.sumaTotal= this.sumaPreciosalida - this.sumadesceunto

  }

}
