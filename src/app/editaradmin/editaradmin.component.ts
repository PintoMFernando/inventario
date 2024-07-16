import { ChangeDetectorRef, Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ModalserviceService } from '../services/modalservice.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-editaradmin',
  templateUrl: './editaradmin.component.html',
  styleUrls: ['./editaradmin.component.css']
})
export class EditaradminComponent {

  iduser:string ="";
  username:number =0;
  email:number =0;
  password:string ="";
  
  formulario: FormGroup;


  

  constructor(
    public ref: DynamicDialogConfig,
    private cdRef: ChangeDetectorRef, 
    private messageService: MessageService, 
    private modalService:ModalserviceService,
    private fb: FormBuilder,
    private userService:UserService
   
   

  )
  {
    this.formulario = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(/.*@.*/)]],
      password: ['', [Validators.required, Validators.pattern(/^.{6,}$/)]]
    });


  }
 


  ngOnInit() {
    this.iduser=this.ref.data.iduser;
  this.username=this.ref.data.username;
  this.email=this.ref.data.email;
  this.password=this.ref.data.password;

    this.formulario.patchValue({
      username: this.username,
      email: this.email,
      
    });
  
    
    

    
  }

   
  async editarUser(){

    if (this.formulario.valid) {
      console.log('Formulario enviado', this.formulario.value);
    
      const username = this.formulario.get('username')?.value;
    const email = this.formulario.get('email')?.value;
    const password = this.formulario.get('password')?.value;

      
      await this.userService.editarUser(this.iduser,username,email,password)
      await  this.modalService.closeModal();
      await this.modalService.enviarMensaje('que se ejecute y liste');
    } else {
      console.log('Formulario inválido');
    }
  }
  

  
  

}
