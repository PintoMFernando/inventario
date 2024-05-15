import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReporteService } from '../services/reporte.service';
import { ReportemesanioService } from '../services/reportemesanio.service';

@Component({
  selector: 'app-reporteimpmesanio',
  templateUrl: './reporteimpmesanio.component.html',
  styleUrls: ['./reporteimpmesanio.component.css']
})
export class ReporteimpmesanioComponent {

  constructor(
    private route: ActivatedRoute,
    public reporteaniomesService:ReportemesanioService
   

) {
}
tiporeporte:string="";
mes:string="";
anio:string="";
misdatos:any;
fechaDeHoy = new Date().toLocaleDateString('es-ES');
totalprecio:number=0;
totalcantidad:number=0;
valorprecio:any;
valorcantidad:any;
meses:any;



  ngOnInit() { 

    this.tiporeporte = this.route.snapshot.params['tiporeporte'];
    this.anio = this.route.snapshot.params['selectanio']
    this.mes = this.route.snapshot.params['selectmes']
    console.log("llegan mis datos???? o nel?",this.anio ,this.mes,this.tiporeporte)
    this.generarReporte();
  }

  async generarReporte(){
    if(this.tiporeporte == "entrada"){
      await this.reporteaniomesService.traerEntradas(this.anio,this.mes).subscribe({
        next: (data:any)=>{ 
          
          this.misdatos=data;
          console.log("mis datos?asaasassas??asas",this.misdatos)
          for (const producto of this.misdatos) {
            this.valorprecio = Number(producto.precioTotal);
            this.totalprecio = this.valorprecio+this.totalprecio
            
      
            
          }
          for (const producto of this.misdatos) {
            this.valorcantidad = Number(producto.cantidadTotal);
            this.totalcantidad = this.valorcantidad+this.totalcantidad
            
      
            
          }
      
          


      },
        complete: () => { }, // completeHandler
        error: (error) => { console.log('Este es el error', error)},    
             
      });
    
    
    
    
    
    
    }else{
      
      await this.reporteaniomesService.traerSalidas(this.anio,this.mes).subscribe({
        next: (data:any)=>{ 
          
          this.misdatos=data;
          console.log("mis datos?asaasassas??asas salidas",this.misdatos)
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

  obtenerNombreMes(numero: any): string {
    const fecha = new Date(2024, numero - 1); // Restamos 1 porque en JavaScript los meses empiezan en 0
    const nombreMes = fecha.toLocaleString('default', { month: 'long' });
    return nombreMes;
  }

}
