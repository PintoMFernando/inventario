import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
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


    async agregarProforma( idproforma:string,nombre:string,ci:any,telefono:any,idsalida:string) {

      const jsondatos={
        idproforma:idproforma,
        estado:1,
        nombre:nombre,
        ci:ci,
        telefono:telefono,
        tipo:1,
        idsalida:idsalida,
      }

     
    
      console.log("entra als erviceeeeeeeexdxdxdxd",jsondatos);
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

    async editarProforma(idproforma:string,nombre:string,ci:string,telefono:number,estado:any){
      
      const jsondatos={
        idproforma:idproforma,
        nombre:nombre,
        ci:ci,
        telefono:telefono,
        estado:estado,
        

      }
      console.log("es minjson",jsondatos)
       try{
        return  await firstValueFrom(this.http.patch(`${this.baseUrl}/proforma/${idproforma}`, jsondatos, { headers: this.headers }))
       }catch(e){
         return e
       }
    
       


    }

    async editarProformaestado(idproforma:string,estado:number){
      
      const jsondatos={
        idproforma:idproforma,
        estado:estado,
        

      }
      console.log("es minjson",jsondatos)
       try{
        return  await firstValueFrom(this.http.patch(`${this.baseUrl}/proforma/${idproforma}`, jsondatos, { headers: this.headers }))
       }catch(e){
         return e
       }
    
       


    }


    
    traerunProforma(isproducto:string): Observable<any> {
      return this.http.get<any>(`${this.baseUrl}/proforma/${isproducto}`);
      
     }


}
