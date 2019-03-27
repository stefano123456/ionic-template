export class Funcionario{
    id: string;
    nomeCompleto: string;
    matricula: string;
    salario: string;
    cargo: string;
    imagem: string;

    constructor(objfirebase : any){
        this.nomeCompleto = objfirebase.nomeCompleto ;
        this.matricula = objfirebase.matricula ;
        this.salario = objfirebase.salario ;
        this.cargo = objfirebase.cargo ;
        this.imagem = objfirebase.imagem ;
    }

}