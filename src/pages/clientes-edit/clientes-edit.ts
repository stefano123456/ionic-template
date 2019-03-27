import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFireAuth } from 'angularfire2/auth';
import { Cliente } from '../../model/cliente';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-clientes-edit',
  templateUrl: 'clientes-edit.html',
})
export class ClientesEditPage {

  clientes : Cliente;
  formGroup: FormGroup;
  firestore = firebase.firestore();
  imagem : any;
  uid : string;
  
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public storage: AngularFireStorage,
    public firebaseauth: AngularFireAuth) {
  
      this.clientes= this.navParams.get('clientes');
      this.form();
      this.uid = this.clientes.id;
    }

    ionViewDidLoad() {
 
     this.downloadFoto(); //foto carrega ao abrir a página
    }
  form(){
    this.formGroup = this.formBuilder.group({
      nome: [this.clientes.nome, [Validators.required]],
      email: [this.clientes.email, [Validators.required]],
      telefone: [this.clientes.telefone, [Validators.required]],
      endereco: [this.clientes.endereco, [Validators.required]],
      cep: [this.clientes.cep, [Validators.required]],
      cidade: [this.clientes.cidade, [Validators.required]],
      bairro: [this.clientes.bairro, [Validators.required]]

    });
  }
  atualizar(){
    this.firestore.collection("cliente").doc(this.clientes.id)
    .update(this.formGroup.value).then(() =>{
        console.log("cadastrado com sucesso");
        this.navCtrl.setRoot('ClientesPage');
      }).catch(err =>{
        console.log(err.mensage);
      });
  }
  enviaImg(event){
    //pega o arquivo do formulário
    this.imagem = event.srcElement.files[0];
    this.upload();
  }
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
      this.clientes.imagem = url; // foto baixada com sucesso
      console.log(url)
    }).catch(()=>{ //foto não existe,pega foto padrão
      this.clientes.imagem = "https://www.gazetadopovo.com.br/blogs/dias-da-vida/wp-content/themes/padrao/imagens/perfil-blog.png";
    })
  }
}
