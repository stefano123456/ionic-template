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
    //referência para a coleção dados
   var docRef = this.firestore.collection("dados").doc(this.uid);

   docRef.get().then(doc =>{ //solicita o documento

    if(doc.exists){ // verifica se existe o documento
      this.dados.setDados(doc.data()); //se existir,pega os dados
    }else{
      //se não existir ele cria, este código será modificado
      this.firestore.collection("dados").doc(this.uid).set(
        {'nome':'stefano','telefone':'983283731'}
      ).then(ref =>{
        // utiliza o mesmo dado acim, este código será removido
       this.dados.setDados({'nome':'Stefano','telefone':'983283731'});
      }).catch(err =>{
        console.log(err.message)
      })
    }
   })
   this.downloadFoto(); //foto carrega ao abrir a página
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
      this.downloadFoto();
    })
  }
  downloadFoto(){
    let ref = 'usuario/'+this.uid+'.jpg';//pasta do servidor
    let gsReference = firebase.storage().ref().child(ref); //referência do arquivo no servidor

    gsReference.getDownloadURL().then( url =>{ //tenta baixar a foto do servidor
      this.dados.foto = url; // foto baixada com sucesso
    }).catch(()=>{ //foto não existe,pega foto padrão
      this.dados.foto = "https://www.gazetadopovo.com.br/blogs/dias-da-vida/wp-content/themes/padrao/imagens/perfil-blog.png";
    })
  }
}
