import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { producto } from '../models/producto.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ReportediaService {

  constructor(private http:  HttpClient,) 
  { }
  private baseUrl = environment.url;
    private headers = { 'Content-Type': 'application/json' };


  


    traerEntradas(fecha:string): Observable<producto> {
      return this.http.get<producto>(`${this.baseUrl}/producto/reportediaentrada/${fecha}`);
      
     }


     traerSalidas(fecha:string): Observable<producto> {
      return this.http.get<producto>(`${this.baseUrl}/producto/reportediasalida/${fecha}`);
      
     }


}
