import { Component } from '@angular/core';
import { ReportediaService } from '../services/reportedia.service';
import { ActivatedRoute } from '@angular/router';
import { SalidasService } from '../services/salidas.service';

@Component({
  selector: 'app-proformaimp',
  templateUrl: './proformaimp.component.html',
  styleUrls: ['./proformaimp.component.css']
})
export class ProformaimpComponent {

  constructor(
   
    private route: ActivatedRoute,
    private salidaService: SalidasService
    
   

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

  ngOnInit() { 
 

  
    this.idsalida=this.route.snapshot.params['idsalida'];
    this.nombre=this.route.snapshot.params['nombre'];
    this.ci=this.route.snapshot.params['ci'];
    this.telefono=this.route.snapshot.params['telefono'];
   
   // this.fechacorta = this.fecha!.toISOString().slice(0, 10);
    this.traerdatos()
  
    console.log("llegan mis datos ooo????????",this.idsalida,this.nombre,this.ci,this.telefono)
    //this.generarReporte();
  }

  async traerdatos(){

    await this.salidaService.traerunaSalida(this.idsalida).subscribe({
      next: (data:any)=>{ 
        
        this.misdatos=data;
        console.log("mis datos de proforma????",this.misdatos)
    /*    for (const producto of this.misdatos) {
          this.valorprecio = Number(producto.precioTotal);
          this.totalprecio = this.valorprecio+this.totalprecio
          
    
          console.log("mis datos?asasas??",producto.precioTotal)
        }
        for (const producto of this.misdatos) {
          this.valorcantidad = Number(producto.cantidadTotal);
          this.totalcantidad = this.valorcantidad+this.totalcantidad
          
    
          
        }*/
    
    },
      complete: () => { }, // completeHandler
      error: (error) => { console.log('Este es el error', error)},    
           
    });




  }

}
