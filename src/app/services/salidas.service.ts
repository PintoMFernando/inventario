import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { v4 as uuidv4 } from 'uuid';
import { producto } from '../models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class SalidasService {

 
  constructor(private http:  HttpClient,) 
  { }
  private baseUrl = environment.url;
    private headers = { 'Content-Type': 'application/json' };


    async agregarSalidas( idsalida:string,idproducto:any,precioProducto:number,cantidad:any,preciototal:any,descuento:any) {

      const jsondatos={
        idsalida:idsalida,
        idproducto:idproducto,
        cantidad:cantidad,
        preciosalida: Number(precioProducto),
        preciototal:preciototal,
        descuento:descuento,
        proforma: 1,

      }

     
    
      console.log("entra als erviceeeeeeee",jsondatos);
      try{
      //  return
      return  await firstValueFrom(this.http.post(`${this.baseUrl}/salida`, jsondatos))
      }catch(e){
      return e
      }
      }

      async traerSalidas(){

        return await this.http.get(`${this.baseUrl}/salida`);
      


    }
    async traerSalidasFecha(anio:number,mes:number){
   console.log("asdasd",anio,mes)
      return this.http.get<producto>(`${this.baseUrl}/salida/admfechaaniomessalida/${anio}/${mes}`);
  
  }



    async editarSalidas(idsalida:string,cantidad:number,preciototal:number,preciosalida:number,nuevacantidad:number,idproducto:string){
      
      const jsondatos={
        cantidad:cantidad,
        preciosalida:preciosalida,
        preciototal:preciototal,
        idproducto:idproducto
        

      }
      console.log("es minjson",jsondatos,idsalida)
       try{
        return  await firstValueFrom(this.http.patch(`${this.baseUrl}/salida/${idsalida}/${nuevacantidad}`, jsondatos, { headers: this.headers }))
       }catch(e){
         return e
       }
    
       


    }

    async eliminarSalida(idsalida:string,idproducto:string,cantidad:number){
      return await this.http.delete(`${this.baseUrl}/salida/${idsalida}/${idproducto}/${cantidad}`).subscribe(
        () => {
          console.log('Entrada eliminada correctamente otrosuma');
        },
        (error) => {
          console.error('Error al eliminar la entrada ', error);
        }
      );;

    }
   

    traerunaSalida(isdalida:string): Observable<producto> {
      return this.http.get<producto>(`${this.baseUrl}/salida/proformaimp/${isdalida}`);
      
     }



      
}
