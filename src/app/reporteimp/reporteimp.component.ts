import { AbstractType, Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReporteService } from '../services/reporte.service';

@Component({
  selector: 'app-reporteimp',
  templateUrl: './reporteimp.component.html',
  styleUrls: ['./reporteimp.component.css']
})
export class ReporteimpComponent {
  constructor(
    private route: ActivatedRoute,
    public reporteService:ReporteService
   

) {
}


 fechainicio!:Date;
fechafinal!:Date;
misdatos:any;
tiporeporte:string="";
fechaDeHoy = new Date().toLocaleDateString('es-ES');
fechainiciocorta:any;
fechafinalcorta:any;
totalprecio:number=0;
totalcantidad:number=0;
valorprecio:any;
valorcantidad:any;

ngOnInit() { 
 

  
  
  this.fechainicio = new Date(this.route.snapshot.params['fechainicio']);
  this.fechafinal = new Date(this.route.snapshot.params['fechafinal']);
  this.tiporeporte = this.route.snapshot.params['tiporeporte'];

  this.fechainiciocorta = this.fechainicio!.toISOString().slice(0, 10);
  this.fechafinalcorta = this.fechafinal!.toISOString().slice(0, 10);

  console.log("llegan mis datos?????",this.fechainicio!.toISOString().slice(0, 10),this.fechafinal!.toISOString().slice(0, 10),this.tiporeporte)
  this.generarReporte();
}


async generarReporte(){
  if(this.tiporeporte== "salida"){
  (
    
    //await this.reporteService.reporteFecha(this.fechainicio!.toISOString().slice(0, 10),this.fechafinal!.toISOString().slice(0, 10),this.tiporeporte)).subscribe({
      await this.reporteService.reporteFecha(this.fechainicio!.toISOString().slice(0, 10),this.fechafinal!.toISOString().slice(0, 10),this.tiporeporte)).subscribe({
    next: (data:any)=>{ 
      
      this.misdatos=data;
      for (const producto of this.misdatos) {
        this.valorprecio = Number(producto.precioTotal);
        this.totalprecio = this.valorprecio+this.totalprecio
        

        console.log("mis datos?asasas??",producto.precioTotal)
      }
      for (const producto of this.misdatos) {
        this.valorcantidad = Number(producto.cantidadTotal);
        this.totalcantidad = this.valorcantidad+this.totalcantidad
        

        
      }


    

  },
    complete: () => { }, // completeHandler
    error: (error) => { console.log('Este es el error', error)},    
         
});
}else{ //entrada

  (
    
      await this.reporteService.reporteFecha(this.fechainicio!.toISOString().slice(0, 10),this.fechafinal!.toISOString().slice(0, 10),this.tiporeporte)).subscribe({
    next: (data:any)=>{ 
      
      this.misdatos=data;
      for (const producto of this.misdatos) {
        this.valorprecio = Number(producto.precioTotal);
        this.totalprecio = this.valorprecio+this.totalprecio
        

        console.log("mis datos?asasas??",producto.precioTotal)
      }
      for (const producto of this.misdatos) {
        this.valorcantidad = Number(producto.cantidadTotal);
        this.totalcantidad = this.valorcantidad+this.totalcantidad
        

        
      }


    

  },
    complete: () => { }, // completeHandler
    error: (error) => { console.log('Este es el error', error)},    
         
});


}
    console.log("aquie stan mis cosas bro?? fechas",this.fechafinal,this.fechainicio,this.tiporeporte)
    //this.fechainicio=(this.fechainicio!.toISOString().slice(0, 10));
    //this.fechafinal=this.fechafinal!.toISOString().slice(0, 10)
    console.log("aquí están mis cosas bro?? fechas", this.fechafinal!.toISOString().slice(0, 10), this.fechainicio!.toISOString().slice(0, 10));
   //  await this.reporteService.reporteFecha(this.fechainicio!.toISOString().slice(0, 10),this.fechafinal!.toISOString().slice(0, 10),this.tiporeporte)

  }









 

}
