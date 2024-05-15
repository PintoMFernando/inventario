import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { producto } from '../models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class ReportemesanioService {

  
  constructor(private http:  HttpClient,) 
  { }
  private baseUrl = environment.url;
    private headers = { 'Content-Type': 'application/json' };


  


    traerEntradas(anio:string,mes:string): Observable<producto> {
      return this.http.get<producto>(`${this.baseUrl}/producto/reportefechaaniomesentrada/${anio}/${mes}`);
      
     }


     traerSalidas(anio:string,mes:string): Observable<producto> {
      return this.http.get<producto>(`${this.baseUrl}/producto/reportefechaaniomesalida/${anio}/${mes}`);
      
     }


   
}
