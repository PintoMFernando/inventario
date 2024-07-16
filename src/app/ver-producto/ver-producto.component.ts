import { ChangeDetectorRef, Component } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ProductoService } from '../services/producto.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-ver-producto',
  templateUrl: './ver-producto.component.html',
  styleUrls: ['./ver-producto.component.css']
})
export class VerProductoComponent {

  idproducto:any;
  producto: string="";
  data:any;
  miProducto:any []=[];
  urlImage:string= 'http://localhost:3000/upload/';
  nombreImage:string =''; 

  constructor(
    public ref: DynamicDialogConfig,
    public productoService: ProductoService,
    private cdRef: ChangeDetectorRef, 

  ){
    
  }

  ngOnInit() {
    this.mostrarProducto();
    

    
  }

 async  mostrarProducto(){
    this.idproducto=this.ref.data.idproducto;
   // this.data=await this.productoService.verProducto(this.idproducto)
    const source$ = this.productoService.verProducto(this.idproducto); //con esto traigo el id
   const data:any = await lastValueFrom(source$);
   this.miProducto=data;

    console.log("traer mis datos?????",this.miProducto)
    console.log("traer mis datoasdasdasdas?????",data[0].nombre)
    console.log("mi urllll?????",this.urlImage+data[0].image)
    this.nombreImage=data[0].image
    this.cdRef.detectChanges();
  }

  baseUrl = 'http://localhost:3000/upload/2024042602424256-product.png';
  getUrlImagen(nombreImagen: string): string {
    return this.baseUrl + nombreImagen;
  }

 
  formatearFecha(fecha: string): string {
    // Formato de la fecha deseado (YYYY-MM-DD HH:mm:ss)
    const partes = fecha.split('T');
    const fechaFormateada = partes[0] + ' ' + partes[1].split('.')[0]; // Elimina los milisegundos
    return fechaFormateada;
  }


}
