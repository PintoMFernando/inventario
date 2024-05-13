import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, firstValueFrom, of } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { v4 as uuidv4 } from 'uuid';
import { producto } from '../models/producto.model';
@Injectable({
  providedIn: 'root'
})
export class ReporteService {

 
  constructor(private http:  HttpClient,) 
  { }
  private baseUrl = environment.url;
    private headers = { 'Content-Type': 'application/json' };


   /* async reporteFecha( fechainicio:string,fechafinal:string,tiporeporte:string) {
    
      return  await firstValueFrom(this.http.get(`${this.baseUrl}/producto/reportefecha/${fechainicio}/${fechafinal}/${tiporeporte}`))
      
      }
*/
      reporteFecha(fechainicio:string,fechafinal:string,tiporeporte:string): Observable<producto> {
        return this.http.get<producto>(`${this.baseUrl}/producto/reportefecha/${fechainicio}/${fechafinal}/${tiporeporte}`);
        
       }

     




      async traerSalidas(){

        return await this.http.get(`${this.baseUrl}/salida`);
      


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
   
}
