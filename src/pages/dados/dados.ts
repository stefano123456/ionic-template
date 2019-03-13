import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';
import { Dados } from '../../model/dados';
import { AngularFireAuth } from '@angular/fire/auth';
import {AngularFireStorage} from 'angularfire2/storage';

@IonicPage()
@Component({
  selector: 'page-dados',
  templateUrl: 'dados.html',
})
export class DadosPage {
  
  firestore = firebase.firestore();
  uid : string;
  dados : Dados = new Dados();
  imagem : any;
  
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public firebaseauth: AngularFireAuth,
    public storage : AngularFireStorage) {
       
    this.uid = this.firebaseauth.auth.currentUser.uid
  }

  ionViewDidLoad() {
   // console.log('ionViewDidLoad DadosPage');
  }

  enviaArquivo(event){
    //pega o arquivo do formulário
    this.imagem = event.srcElement.files[0];
    this.upload();
  }
  //Enviar o arquivo para o servidor
  upload(){
    //diretório + caminho imagem no servidor
    let ref = firebase.storage().ref().child(`usuario/${this.uid}.jpg`);
    //executar o upload
    ref.put(this.imagem).then(resp => {
      //se sucesso, pega a url para download da imagem 
      ref.getDownloadURL().then(url =>{
       // console.log(url);//URL para dwnload
       this.dados.foto = url; 
      }).catch(err =>{
        //houve algum erro
        console.log(err);
      })
    })
  }
}
