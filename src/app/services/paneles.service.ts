import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PanelesService {

  constructor() { }


  private datosRecibidosSource = new BehaviorSubject<any[]>([]);
  datosRecibidos$ = this.datosRecibidosSource.asObservable();

  enviarDatos(datos: any) {
    const datosAcumulados = this.datosRecibidosSource.getValue();
    datosAcumulados.push(datos);
    this.datosRecibidosSource.next(datosAcumulados);
  }

  vaciarDatos() {
    this.datosRecibidosSource.next([]);
  }
  
}
