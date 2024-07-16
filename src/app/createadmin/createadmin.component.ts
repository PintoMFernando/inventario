import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { MessageService } from 'primeng/api';
import { ModalserviceService } from '../services/modalservice.service';

@Component({
  selector: 'app-createadmin',
  templateUrl: './createadmin.component.html',
  styleUrls: ['./createadmin.component.css']
})
export class CreateadminComponent {


  constructor(
    
    private userService: UserService,
    private messageService: MessageService, 
    
    private modalService: ModalserviceService,
    
    
  ) {
    

  }

  usuario = {
    nombre: '',
    correo: '',
    contrasena: ''
  };

  async onSubmit() {

    try {
      const response = await this.userService.agregarUsuario(this.usuario.nombre,this.usuario.correo,this.usuario.contrasena)
      console.log('Formulario enviado', this.usuario);
        await this.messageService.add({ severity: 'info', summary: 'Confirmado!', detail: 'Usuario Creado Con exito' });
      await  this.modalService.closeModal();
      await this.modalService.enviarMensaje('que se ejecute');
      console.log('Respuesta del backend:', response);
    } catch (error) {
      await this.messageService.add({ severity: 'warning', summary: 'Error!', detail: 'Ah ocurrido un problema intentelo nuevamente' });
      console.error('Error al llamar al servicio:', error);
      // Aquí puedes manejar el error, por ejemplo, mostrar un mensaje de error al usuario
    }

    
    // Aquí puedes añadir la lógica para procesar el formulario, como enviar los datos a un servidor
  }


}
