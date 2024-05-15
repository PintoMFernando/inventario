import { NgModule ,LOCALE_ID} from '@angular/core';
import localeEs from '@angular/common/locales/es';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PrincipalComponent } from './principal/principal.component';
import { SplitterModule } from 'primeng/splitter';
import { ProductosComponent } from './productos/productos.component';
import { EntradasalidaComponent } from './entradasalida/entradasalida.component';
import { InformeComponent } from './informe/informe.component';
//import { SplitterModule } from 'primeng/splitter';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { NewproductComponent } from './newproduct/newproduct.component';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { EditarProductoComponent } from './editar-producto/editar-producto.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { VerProductoComponent } from './ver-producto/ver-producto.component';
import { FileUploadModule } from 'primeng/fileupload';
import { SalidasComponent } from './salidas/salidas.component';

import { TagModule } from 'primeng/tag';
import { InicioComponent } from './inicio/inicio.component';

import { TreeModule } from 'primeng/tree';

import { MenuModule } from 'primeng/menu';
import { InformemensualComponent } from './informemensual/informemensual.component';
import { InformediarioComponent } from './informediario/informediario.component';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';
import { EditarEntradaComponent } from './editar-entrada/editar-entrada.component';
import { EditarSalidaComponent } from './editar-salida/editar-salida.component';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ReporteimpComponent } from './reporteimp/reporteimp.component';
import { ReporteimpmesanioComponent } from './reporteimpmesanio/reporteimpmesanio.component';
import { ReporteimpdiaComponent } from './reporteimpdia/reporteimpdia.component';


@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    AppComponent,
    PrincipalComponent,
    ProductosComponent,
    EntradasalidaComponent,
    InformeComponent,
    NewproductComponent,
    EditarProductoComponent,
    VerProductoComponent,
    SalidasComponent,
    InicioComponent,
    InformemensualComponent,
    InformediarioComponent,
    EditarEntradaComponent,
    EditarSalidaComponent,
    ReporteimpComponent,
    ReporteimpmesanioComponent,
    ReporteimpdiaComponent,
  
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SplitterModule,
    PanelModule,
    TableModule,
    ButtonModule,
    DialogModule,
    DynamicDialogModule,
    ToastModule,
    ConfirmDialogModule,
    FileUploadModule,
    TagModule,
    TreeModule,
    MenuModule, 
    CalendarModule,
    DropdownModule,
    FileUploadModule,
    FormsModule,
    CommonModule, 
    CarouselModule,
    RadioButtonModule
    
    
    
    
    

   

  ],
  providers: [DialogService,ConfirmationService, MessageService,{ provide: LOCALE_ID, useValue: 'es' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
