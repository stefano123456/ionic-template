import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase'; 

/**
 * Generated class for the LivrosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-livros',
  templateUrl: 'livros.html',
})
export class LivrosPage {

    firestore = firebase.firestore();
    settings = {timestampsInSnapshots:true};

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
      console.log(doc.data());
    });
  });
}
}
