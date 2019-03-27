export class Servico{
    id: string;
    nome: string;
    valor: string;
    descricao: string;

    constructor(objfirebase : any){
        this.nome = objfirebase.nome ;
        this.valor = objfirebase.valor ;
        this.descricao = objfirebase.descricao ;
    }
    

}
