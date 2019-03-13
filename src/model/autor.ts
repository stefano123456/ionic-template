export class Autor{
    nome: string;
    email: string;
    telefone: string;
    foto: number;
    

    constructor(objfirebase : any){
        this.nome = objfirebase.nome ;
        this.email = objfirebase.email ;
        this.telefone = objfirebase.telefone ;
        this.foto = objfirebase.foto ;
    }
}