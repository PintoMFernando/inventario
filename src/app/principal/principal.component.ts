import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PrimeIcons, MenuItem } from 'primeng/api';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent {
  
  @ViewChild('menu') menu: any;

  

 
  menuItems: MenuItem[] = [
    { label: 'Opción 1', icon: 'pi pi-fw pi-user-edit', command: () => this.opcion1() },
    { label: 'Opción 2', icon: 'pi pi-fw pi-users', command: () => this.opcion2() }
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  vista: string = ''; // Variable para controlar la vista mostrada en el segundo panel
  username: string="";
  rol: string="";

  ngOnInit(): void {
    // Obtener los parámetros de la ruta
    this.route.params.subscribe(params => {
      // Extraer los valores de los parámetros
      this.username = params['username'];
      this.rol = params['rol'];
    });

    
  }

  mostrarVista(vista: string) {
    this.vista = vista; // Mostrar la vista correspondiente en función del icono clicado

    

  }


  nodes = [
    {
      label: 'Node 1',
      children: [
        {
          label: 'Node 1.1'
        },
        {
          label: 'Node 1.2'
        }
      ]
    },
    {
      label: 'Node 2',
      children: [
        {
          label: 'Node 2.1'
        },
        {
          label: 'Node 2.2'
        }
      ]
    }
  ];

  nodeSelect(event: Event) {
    console.log(event);
  }

  toggleMenu(event: Event) {
    this.menu.toggle();
  }


  showOptions: boolean = false;
  showOptions2: boolean = false;

 

  toggleOptions() {
    this.showOptions = !this.showOptions;
  }

  toggleOptions2() {
    this.showOptions2 = !this.showOptions2;
  }

  opcion1() {
    console.log("Opción 1 seleccionada");
    // Aquí puedes implementar la lógica para la opción 1
  }

  opcion2() {
    console.log("Opción 2 seleccionada");
    // Aquí puedes implementar la lógica para la opción 2
  }

  logout() {
    // Realizar acciones de cierre de sesión si es necesario

    // Redirigir al usuario a la ruta de login
    this.router.navigate(['/login']);
  }


}
