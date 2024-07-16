import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { user } from '../models/user.model';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {

  users!: any[];
  newUser: any = { name: '', email: '' };
  username!: string;
  password!: string;
 rol:number=0;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private userService:UserService,
    private messageService: MessageService,
    //private authService: AuthService,

    ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.apiService.getUsers().subscribe(users => (this.users = users));
  }

  addUser(): void {
    this.apiService.addUser(this.newUser).subscribe(() => {
      this.getUsers();
      this.newUser = { name: '', email: '' };
    });
  }

  redirectToRegistro() {
    this.router.navigate(['/principal']); // Redirecciona a la ruta del componente de registro
  }



  async login(){
    // console.log("llegan mis datos??",this.username,this.password )

   
    (await  this.userService.autenticacion(this.username,this.password)).subscribe({
      next: async (data: any)=>{ 
        console.log("el data que hay",data)
       if(data.length!== 0){
        //this.rol=data[0].rol;
       
        await this.router.navigate(['/principal', this.username, data[0]?.rol]);
        await this.messageService.add({ severity: 'info', summary: 'Exito!', detail: 'Bienvenido'+ this.username });
        console.log("SI hay el usuario",data[0]?.rol)
        
       }
       else{
        console.log("NO hay el usuario",data)
        await this.messageService.add({ severity: 'warning', summary: 'Error!!!', detail: 'Revice sus Datos!!!' });
        
       
       // await this.router.navigate(['/principal', this.username, data]);
       }
        
        
    
    },
      complete: () => { }, // completeHandler
      error: (error) => { console.log('Este es el error', error)},    
           
  });

   /* this.authService.login(this.username, this.password).subscribe(
      success => this.router.navigate(['/']),
      error => alert('Error al iniciar sesión')
    );
*/
  }

}
