export class Livro{
    titulo: string;
    imagem: string;
    resumo: string;
    preco: number;
    autor: string;

    constructor(objfirebase : any){
        this.titulo = objfirebase.titulo ;
        this.imagem = objfirebase.imagem ;
        this.resumo = objfirebase.resumo ;
        this.preco = objfirebase.preco ;
        this.autor = objfirebase.autor ;
    }
}