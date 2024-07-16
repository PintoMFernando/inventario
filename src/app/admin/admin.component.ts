import { ChangeDetectorRef, Component } from '@angular/core';
import { EditaradminComponent } from '../editaradmin/editaradmin.component';
import { ModalserviceService } from '../services/modalservice.service';
import { CreateadminComponent } from '../createadmin/createadmin.component';
import { Subscription } from 'rxjs';
import { UserService } from '../services/user.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  allusers!:any;
  suscripcion: Subscription;
  mensaje: string = '';

  constructor(
    private modalService: ModalserviceService,
    private cdRef: ChangeDetectorRef, 
    private userService:UserService,
    private confirmationService: ConfirmationService, 
    private messageService: MessageService,
    
  ) {

    this.suscripcion = this.modalService.obtenerMensaje().subscribe((mensaje) => {
      //  console.log("concluye el mensaje");
      this.traerUser();
      this.cdRef.detectChanges();
      this.mensaje = mensaje;
      console.log(mensaje);
      });


  }
  ngOnInit() {
    this.traerUser();
    
  
}

crearUser(){

  const data = {header: 'Registro de Usuarios ',
  width: '45%',
  height: '70%',
  data:{
   
  }}
this.modalService.openModal(data,CreateadminComponent);





}
async traerUser(){
  (await this.userService.traerUsers()).subscribe({
    next: (data:any)=>{ 
     
      this.allusers=data;
      console.log("aqui estan todos mis datos de userssss",this.allusers)
      
  
  },
    complete: () => { }, // completeHandler
    error: (error) => { console.log('Este es el error', error)},    
         
});

await this.cdRef.detectChanges();

}


editarUser(iduser:any,username:any,email:any){

  
  const data = {header: 'Editar Usuarios ',
  width: '45%',
  height: '70%',
  data:{
    iduser:iduser,
    username:username,
    email:email

   
  }}
this.modalService.openModal(data,EditaradminComponent);



}
async eliminar(iduser:string){
  this.confirmationService.confirm({
    // target: event.target as EventTarget,
     message: 'Esta Seguro de Eliminar este Usuario?',
     header: 'Confirmacion',
     icon: 'pi pi-exclamation-triangle',
     acceptIcon:"none",
     rejectIcon:"none",
     acceptLabel: 'Sí', 
     rejectLabel: 'No',
     rejectButtonStyleClass:"p-button-text",
     accept: async () => {
       await  this.userService.deleteUser(iduser);
       await this.modalService.enviarMensaje('que se ejecute se esta ejecutantp????');
       await this.cdRef.detectChanges();
         this.messageService.add({ severity: 'info', summary: 'Confirmado!!', detail: 'El Usuario se elimino con Exito' });
     },
     reject: () => {
         this.messageService.add({ severity: 'error', summary: 'Cancelado!!', detail: 'Se Cancelo la Eliminacion', life: 3000 });
     }
 });
}





formatearFecha(fecha: string): string {
  // Formato de la fecha deseado (YYYY-MM-DD HH:mm:ss)
  const partes = fecha.split('T');
  const fechaFormateada = partes[0] + ' ' + partes[1].split('.')[0]; // Elimina los milisegundos
  return fechaFormateada;
}



}
