import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReportediaService } from '../services/reportedia.service';

@Component({
  selector: 'app-reporteimpdia',
  templateUrl: './reporteimpdia.component.html',
  styleUrls: ['./reporteimpdia.component.css']
})
export class ReporteimpdiaComponent {

  constructor(
    private route: ActivatedRoute,
    public reportediaService:ReportediaService
   

) {
}


 fecha!:Date;
misdatos:any;
tiporeporte:string="";
fechaDeHoy = new Date().toLocaleDateString('es-ES');
fechacorta:any;
totalprecio:number=0;
totalcantidad:number=0;
valorprecio:any;
valorcantidad:any;

ngOnInit() { 
 

  
  
  this.fecha = new Date(this.route.snapshot.params['fecha']);
  this.tiporeporte = this.route.snapshot.params['tiporeporte'];

  this.fechacorta = this.fecha!.toISOString().slice(0, 10);
  

  console.log("llegan mis datos?????",this.fecha!.toISOString().slice(0, 10),this.tiporeporte)
  this.generarReporte();
}


async generarReporte(){
  if(this.tiporeporte== "entrada"){
  (
    
    //await this.reporteService.reporteFecha(this.fechainicio!.toISOString().slice(0, 10),this.fechafinal!.toISOString().slice(0, 10),this.tiporeporte)).subscribe({
      await this.reportediaService.traerEntradas(this.fecha!.toISOString().slice(0, 10))).subscribe({
    next: (data:any)=>{ 
      
      this.misdatos=data;
      console.log("llegan mis datos?????asas",this.misdatos)
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
    
      await this.reportediaService.traerSalidas(this.fecha!.toISOString().slice(0, 10))).subscribe({
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
    

  }








  

}
