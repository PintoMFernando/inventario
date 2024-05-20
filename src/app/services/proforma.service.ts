import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { v4 as uuidv4 } from 'uuid';
@Injectable({
  providedIn: 'root'
})
export class ProformaService {

 
 
  constructor(private http:  HttpClient,) 
  { }
  private baseUrl = environment.url;
    private headers = { 'Content-Type': 'application/json' };


    async agregarProforma( idsalida:string) {

      const jsondatos={
        idproforma:uuidv4(),
        estado:1,
        tipo:1,
        idsalida:idsalida,
      }

     
    
      console.log("entra als erviceeeeeeee",jsondatos);
      try{
      //  return
      return  await firstValueFrom(this.http.post(`${this.baseUrl}/proforma`, jsondatos))
      }catch(e){
      return e
      }
      }

      async traerProforma(){

        return await this.http.get(`${this.baseUrl}/salida`);
      


    }
}
