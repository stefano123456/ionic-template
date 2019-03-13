export class Dados{
    nome : string;
    telefone : string;
    foto: string;
  
    constructor(){

    }
    setDados(obj : any){
      this.nome = obj.nome;
      this.telefone = obj.telefone;
      this.foto = obj.foto;
    }
  }