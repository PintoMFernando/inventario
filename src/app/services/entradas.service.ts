import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class EntradasService {

  constructor(private http:  HttpClient,) 
  { }
  private baseUrl = environment.url;
    private headers = { 'Content-Type': 'application/json' };


    async agregarEntradas( idproducto:any,cantidadProducto:any) {

      const jsondatos={
        identrada:uuidv4(),
        idproducto:idproducto,
        cantidad:cantidadProducto,

      }

     
    
      console.log("entra als erviceeeeeeee",jsondatos);
      try{
      //  return
      return  await firstValueFrom(this.http.post(`${this.baseUrl}/entrada`, jsondatos))
      }catch(e){
      return e
      }
      }

      async traerEntradas(){

        return await this.http.get(`${this.baseUrl}/entrada`);
      


    }
   



      

}
