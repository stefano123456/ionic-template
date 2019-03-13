import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Autor } from '../../model/autor';
import firebase from 'firebase';


@IonicPage()
@Component({
  selector: 'page-autores',
  templateUrl: 'autores.html',
})
export class AutoresPage {
    firestore = firebase.firestore();
    settings = {timestampsInSnapshots:true};

    autores: Autor[] = [];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.firestore.settings(this.settings);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AutoresPage');
    this.listaAutor();
  }
listaAutor(){
  var ref = firebase.firestore().collection("autor");
  ref.get().then(query =>{
    
    query.forEach(doc =>{
      //console.log(doc.data());
      let liv = new Autor(doc.data());
      //console.log(liv);
      this.autores.push(liv);
    });
    //console.log(this.autores);
  });
}

}
