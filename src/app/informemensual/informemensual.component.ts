import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-informemensual',
  templateUrl: './informemensual.component.html',
  styleUrls: ['./informemensual.component.css']
})
export class InformemensualComponent {
  products!: any;
  fechaDeHoy = new Date().toLocaleDateString('es-ES');

  panelItems: string[] = [];
  anios: any [] = [];
  tiporeporte:string="entrada";
  mes: any [] = [];
  selectanio: string | undefined;
  selectmes: string | undefined;

  constructor(private router: Router) {}
  ngOnInit() {
    

    this.anios = [
      { anio: '2024' },
      { anio: '2025' },
      { anio: '2026' },
      { anio: '2027' },
      { anio: '2028' },
      { anio: '2029' },
      { anio: '2030' },
      { anio: '2031' },
      { anio: '2032' },
      { anio: '2033' },
      { anio: '2034' },
      { anio: '2035' },
      { anio: '2036' },
      { anio: '2037' },
      { anio: '2038' },
      { anio: '2039' },
      { anio: '2040' },

      
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

  generarReporte(anio: any, mes: any, tiporeporte: any) {
    console.log("Datos de entrada:", anio, mes, tiporeporte);
    
    const anioStr = typeof anio === 'string' ? anio : anio.anio;
    const mesStr = typeof mes === 'object' ? mes.mes : mes; // Si mes es un objeto, se asume que es el objeto completo
    const tiporeporteStr = typeof tiporeporte === 'string' ? tiporeporte : tiporeporte.tiporeporte;
  
    console.log("Datos convertidos:", anioStr, mesStr, tiporeporteStr);
    
    this.router.navigate(['/reporteimpmesanio', anioStr, mesStr, tiporeporteStr]);
  }
  

}
