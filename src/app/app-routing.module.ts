import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { PrincipalComponent } from './principal/principal.component';
import { ProductosComponent } from './productos/productos.component';
import { EntradasalidaComponent } from './entradasalida/entradasalida.component';
import { InformeComponent } from './informe/informe.component';
import { NewproductComponent } from './newproduct/newproduct.component';
import { AppComponent } from './app.component';
import { ReporteimpComponent } from './reporteimp/reporteimp.component';
import { ReporteimpmesanioComponent } from './reporteimpmesanio/reporteimpmesanio.component';
import { ReporteimpdiaComponent } from './reporteimpdia/reporteimpdia.component';
import { ProformaimpComponent } from './proformaimp/proformaimp.component';




/*const routes: Routes = [
  // Ingreso
  { path: 'login', component: WelcomeComponent },
  { path: 'principal', component: PrincipalComponent },
  { path: 'productos', component: ProductosComponent },
  { path: 'entradasalida', component: EntradasalidaComponent },
  { path: 'informe', component: InformeComponent },
  { path: 'newproduct', component: NewproductComponent },
 // { path: '', redirectTo: '/login', pathMatch: 'full' },
 { path: '**', redirectTo: '' } // Redirecciona cualquier otra ruta a la principal

 // { path: '**', redirectTo: '/login' }
];*/
const routes: Routes = [{
  path:'',
  
  component:AppComponent,
  children:[
    { path: 'login', component: WelcomeComponent },
    { path: 'principal/:username/:rol', component: PrincipalComponent },
    { path: 'productos', component: ProductosComponent },
    { path: 'entradasalida', component: EntradasalidaComponent },
    { path: 'informe', component: InformeComponent },
    { path: 'newproduct', component: NewproductComponent },
    { path: 'reporteimp/:fechainicio/:fechafinal/:tiporeporte', component: ReporteimpComponent },
    { path: 'reporteimpmesanio/:selectanio/:selectmes/:tiporeporte', component:ReporteimpmesanioComponent},
    { path: 'reporteimpdia/:fecha/:tiporeporte', component:ReporteimpdiaComponent},
    { path: 'proforma/:idproforma', component:ProformaimpComponent},
     
  
  
  
   
  
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
