import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ProductoService } from '../services/producto.service';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {

  content: string = '';
  panelItems: string[] = [];
  salidas!: any;
  fechaDeHoy = new Date().toLocaleDateString('es-ES');
  fechaDeHoy2 = new Date();

  misdatosInicio:any;

  constructor(
    
    private productosService: ProductoService, 
  ){

  }

  
  ngOnInit() {
    this.traerdatos()
    
    this.salidas = [
      {  nombre: 'Producto 1', fecha:'2/3/2024',codigo:'pc1' ,precio: 10.99,cantidad:12 },
      {  nombre: 'Producto 2', fecha:'2/3/2024',codigo:'pc2',precio: 20.99 ,cantidad:3},
      { nombre: 'Producto 3', fecha:'3/3/2024',codigo:'pc3',precio: 30.99 ,cantidad:4},
     
    ];

  }

 async traerdatos(){
  const anio = this.fechaDeHoy2.getFullYear();
  const mes = (this.fechaDeHoy2.getMonth() + 1).toString().padStart(2, '0');
  const dia = this.fechaDeHoy2.getDate().toString().padStart(2, '0');
  const fechaFormateada = `${anio}-${mes}-${dia}`;

    

    await this.productosService.traerdatosInicio(fechaFormateada).subscribe({
      next: (data:any)=>{ 
        
        this.misdatosInicio=data;
        console.log("llegan mis datos?????asas",this.misdatosInicio)
    
    },
      complete: () => { }, // completeHandler
      error: (error) => { console.log('Este es el error', error)},    
           
  });


  }
  

  addToPanel() {
    if (this.content.trim() !== '') {
      this.panelItems.push(this.content);
      this.content = ''; // Limpia el campo de entrada después de agregar
    }
  }

 

  

}
