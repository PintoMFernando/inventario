import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { v4 as uuidv4 } from 'uuid';
import { user } from '../models/user.model';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:  HttpClient,) 
  { }
  private baseUrl = environment.url;
    private headers = { 'Content-Type': 'application/json' };


    async agregarUsuario( nombre:any,correo:any,password:any) {

      const jsondatos={
        iduser:uuidv4(),
        username:nombre,
        email:correo,
        password:password,
        rol:2

      }

      console.log("entra als erviceeeeeeee",jsondatos);
      try{
      //  return
      return  await firstValueFrom(this.http.post(`${this.baseUrl}/user`, jsondatos))

      }catch(error){
      return error
      }
      }




      async traerUsers(){
       
        return await this.http.get(`${this.baseUrl}/user`);
    
    }

    async editarUser(iduser:string,username:string,correo:string,password:number){
      
      const jsondatos={
        iduser:iduser,
        username:username,
        email:correo,
        password:password,
      
      }
      console.log("es minjson",jsondatos)
       try{
        return  await firstValueFrom(this.http.patch(`${this.baseUrl}/user/${iduser}`, jsondatos, { headers: this.headers }))
       }catch(e){
         return e
       }
    
       


    }


    async deleteUser(iduser:string){
      //importante manejar el subscribe para eliminar
      console.log(iduser);
   return await this.http.delete(`${this.baseUrl}/user/${iduser}`).subscribe(
     () => {
       console.log('user eliminada correctamente');
     },
     (error) => {
       console.error('Error al eliminar el ususario', error);
     }
   );;
  
  }


  autenticacion(user:string,password:string){
    console.log('mi user mi opasss',user,password);
    return this.http.get<user>(`${this.baseUrl}/user/${user}/${password}`);

  }
  
}

