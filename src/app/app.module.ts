import { NgModule ,LOCALE_ID} from '@angular/core';
import localeEs from '@angular/common/locales/es';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
import { TreeTableModule } from 'primeng/treetable';
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
import { SelectButtonModule } from 'primeng/selectbutton';
import { ProformaComponent } from './proforma/proforma.component';
import { ProformaimpComponent } from './proformaimp/proformaimp.component';
import { AdminentradassalidasComponent } from './adminentradassalidas/adminentradassalidas.component';
import { AdminproformaComponent } from './adminproforma/adminproforma.component';
import { AdminsalidasComponent } from './adminsalidas/adminsalidas.component';
import { EditarProformaComponent } from './editar-proforma/editar-proforma.component';

import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { AdminComponent } from './admin/admin.component';
import { CreateadminComponent } from './createadmin/createadmin.component';
import { EditaradminComponent } from './editaradmin/editaradmin.component';
import { PanelDerechoComponent } from './panel-derecho/panel-derecho.component';
import { PanelinferiorSalidaComponent } from './panelinferior-salida/panelinferior-salida.component';

import { EditarsubproductoComponent } from './editarsubproducto/editarsubproducto.component';
import { BackupComponent } from './backup/backup.component';
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
    ProformaComponent,
    ProformaimpComponent,
    AdminentradassalidasComponent,
    AdminproformaComponent,
    AdminsalidasComponent,
    EditarProformaComponent,
    AdminComponent,
    CreateadminComponent,
    EditaradminComponent,
    PanelDerechoComponent,
    PanelinferiorSalidaComponent,
    EditarsubproductoComponent,
    BackupComponent,
  
    
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
    RadioButtonModule,
    SelectButtonModule,
    ReactiveFormsModule,
    ConfirmPopupModule,
    TreeTableModule
    
    
    
    
    

   

  ],
  providers: [DialogService,ConfirmationService, MessageService,{ provide: LOCALE_ID, useValue: 'es' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
