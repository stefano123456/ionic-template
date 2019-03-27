export class Cliente{
    id: string;
    nome: string;
    email: string;
    telefone: string;
    imagem: string;
    bairro: string;
    endereco: string;
    cep: string;
    cidade: string; 

    constructor(objfirebase : any){
        this.nome = objfirebase.nome ;
        this.email = objfirebase.email ;
        this.telefone = objfirebase.telefone ;
        this.imagem = objfirebase.imagem ;
        this.bairro = objfirebase.bairro ;
        this.endereco = objfirebase.endereco ;
        this.cep = objfirebase.cep ;
        this.cidade = objfirebase.cidade ;
    }

}