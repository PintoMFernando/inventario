import { Component } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { ReporteService } from '../services/reporte.service';
import { RadioButtonModule } from 'primeng/radiobutton';

@Component({
  selector: 'app-informe',
  templateUrl: './informe.component.html',
  styleUrls: ['./informe.component.css']
})
export class InformeComponent {

  fechainicio: Date | undefined;
  fechafinal: Date | undefined;
  panelItems: string[] = [];
  public es:any;
  tiporeporte:string="entrada";
  misdatos:any;
  


  currentDate: Date | undefined;
  minDate: Date | undefined;
  maxDate: Date | undefined;
  fechaDeHoy = new Date().toLocaleDateString('es-ES');

  
  constructor(
    private config: PrimeNGConfig,
    public reporteService:ReporteService
  ) {}

  ngOnInit() {
    this.es = {
      //date
      closeText: "Cerrar",
      prevText: "<Ant",
      nextText: "Sig>",
      currentText: "Hoy",
      monthNames: [ "enero","febrero","marzo","abril","mayo","junio",
      "julio","agosto","septiembre","octubre","noviembre","diciembre" ],
      monthNamesShort: [ "ene","feb","mar","abr","may","jun",
      "jul","ago","sep","oct","nov","dic" ],
      dayNames: [ "domingo","lunes","martes","miércoles","jueves","viernes","sábado" ],
      dayNamesShort: [ "dom","lun","mar","mié","jue","vie","sáb" ],
      dayNamesMin: [ "D","L","M","X","J","V","S" ],
      weekHeader: "Sm",
      dateFormat: "dd/mm/yy",
      firstDay: 1,
      isRTL: false,
      showMonthAfterYear: false,
      yearSuffix: "" ,
      timeOnlyTitle: 'Elegir una hora',
      timeText: 'Hora',
      hourText: 'Horas',
      minuteText: 'Minutos',
      secondText: 'Segundos',
      millisecText: 'Milisegundos',
      microsecText: 'Microsegundos',
      timezoneText: 'Uso horario',
      timeFormat: 'HH:mm',
      timeSuffix: '',
      amNames: ['a.m.', 'AM', 'A'],
      pmNames: ['p.m.', 'PM', 'P'],
  };

    
}
 
 
 async onSubmit(){

  (await this.reporteService.reporteFecha(this.fechainicio!.toISOString().slice(0, 10),this.fechafinal!.toISOString().slice(0, 10),this.tiporeporte)).subscribe({
    next: (data:any)=>{ 
     
      this.misdatos=data;
      console.log("mis datos???",this.misdatos)

  },
    complete: () => { }, // completeHandler
    error: (error) => { console.log('Este es el error', error)},    
         
});

    console.log("aquie stan mis cosas bro?? fechas",this.fechafinal,this.fechainicio,this.tiporeporte)
    //this.fechainicio=(this.fechainicio!.toISOString().slice(0, 10));
    //this.fechafinal=this.fechafinal!.toISOString().slice(0, 10)
    console.log("aquí están mis cosas bro?? fechas", this.fechafinal!.toISOString().slice(0, 10), this.fechainicio!.toISOString().slice(0, 10));
   //  await this.reporteService.reporteFecha(this.fechainicio!.toISOString().slice(0, 10),this.fechafinal!.toISOString().slice(0, 10),this.tiporeporte)

  }

 


}
