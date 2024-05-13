import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReporteService } from '../services/reporte.service';

@Component({
  selector: 'app-reporteimpmesanio',
  templateUrl: './reporteimpmesanio.component.html',
  styleUrls: ['./reporteimpmesanio.component.css']
})
export class ReporteimpmesanioComponent {

  constructor(
    private route: ActivatedRoute,
    public reporteService:ReporteService
   

) {
}
tiporeporte:string="";
mes:string="";
anio:string="";


  ngOnInit() { 

    this.tiporeporte = this.route.snapshot.params['tiporeporte'];
    this.anio = this.route.snapshot.params['selectanio']
    this.mes = this.route.snapshot.params['selectmes']
    console.log("llegan mis datos???? o nel?",this.anio ,this.mes,this.tiporeporte)
    this.generarReporte();
  }

  generarReporte(){

  }

}
