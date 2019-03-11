import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase'; 
import { Livro } from '../../model/livro';


@IonicPage()
@Component({
  selector: 'page-livros',
  templateUrl: 'livros.html',
})
export class LivrosPage {

    firestore = firebase.firestore();
    settings = {timestampsInSnapshots:true};

    // armazenar livros
    livros : Livro[] = [];

  constructor(public navCtrl: NavController,
     public navParams: NavParams){
     this.firestore.settings(this.settings); 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LivrosPage');
    this.listaLivro();
  }
listaLivro(){
  var ref = firebase.firestore().collection("livro");
  ref.get().then(query =>{
    
    query.forEach(doc =>{
      //console.log(doc.data());
      let liv = new Livro(doc.data());
      //console.log(liv);
      this.livros.push(liv);
    });
    //console.log(this.livros);
  });
}
detalhar(obj : Livro){
  // ir para página LivroDetalhes e enviar o objeto livro
  this.navCtrl.push('livroDetalhesPage', {'livro' : obj});
}
}
