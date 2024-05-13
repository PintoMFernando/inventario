import { Entradas } from "./entradas.model";

export class producto{
   

    idproducto?: string;
        nombre?: string ;
        descripcion?:  string;
        precio?:  number;
        codigo?:  string;
        stock?: number;
        image?: string ;
        created_at?: Date ;
        updated_at?: Date;
        entrada?: Entradas;
    

}