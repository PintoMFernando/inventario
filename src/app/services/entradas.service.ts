import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { v4 as uuidv4 } from 'uuid';
import { producto } from '../models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class EntradasService {

  constructor(private http:  HttpClient,) 
  { }
  private baseUrl = environment.url;
    private headers = { 'Content-Type': 'application/json' };


    async agregarEntradas( idproducto:any,cantidadProducto:any,precio:number, detalle:any,precioTotal:number) {

      const jsondatos={
        identrada:uuidv4(),
        idproducto:idproducto,
        cantidad:cantidadProducto,
        precioentrada:Number(precio),
        detalle:detalle,
        preciototal:precioTotal,

      }

     
    
      console.log("entra als erviceeeeeeee",jsondatos);
      try{
      //  return
      return  await firstValueFrom(this.http.post(`${this.baseUrl}/entrada`, jsondatos))
      }catch(e){
      return e
      }
      }

      async traerEntradas(fecha:string){
        console.log("dasdasd fecha",fecha)
        return await this.http.get(`${this.baseUrl}/entrada`);
    
    }
    async traerEntradasFecha(anio:number,mes:number){

      return this.http.get<producto>(`${this.baseUrl}/producto/admfechaaniomesentrada/${anio}/${mes}`);
  
  }

  



    async editarEntradas(identrada:string,cantidad:number,precioentrada:number,nuevacantidad:number,tipo:number,idproducto:string,detalle:string,idstockproducto:string){

      const jsondatos={
        idproducto:idproducto,
        cantidad:cantidad,
        precioentrada:Number(precioentrada),
       detalle:detalle,
       
        //tipo:tipo

      }
      console.log("es minjson",jsondatos)
       try{
        return  await firstValueFrom(this.http.patch(`${this.baseUrl}/entrada/${identrada}/${nuevacantidad}/${idstockproducto}`, jsondatos, { headers: this.headers }))
       }catch(e){
         return e
       }
    
       


    }

    async eliminarEntrada(identrada:string,idproducto:string,cantidad:number){
      return await this.http.delete(`${this.baseUrl}/entrada/${identrada}/${idproducto}/${cantidad}`).subscribe(
        () => {
          console.log('Entrada eliminada correctamente otrosuma');
        },
        (error) => {
          console.error('Error al eliminar la entrada ', error);
        }
      );;

    }
   



      

}
