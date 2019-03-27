import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFireAuth } from 'angularfire2/auth';
import { Funcionario } from '../../model/funcionario';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-funcionarios-edit',
  templateUrl: 'funcionarios-edit.html',
})
export class FuncionariosEditPage {

  funcionarios : Funcionario;
  formGroup: FormGroup;
  firestore = firebase.firestore();
  imagem : any;
  uid : string;
  
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public storage: AngularFireStorage,
    public firebaseauth: AngularFireAuth) {
  
      this.funcionarios= this.navParams.get('funcionarios');
      
      this.form();
      this.uid = this.funcionarios.id;
    }

    ionViewDidLoad() {
 
     this.downloadFoto(); //foto carrega ao abrir a página
    }
  form(){
    this.formGroup = this.formBuilder.group({
      nomeCompleto: [this.funcionarios.nomeCompleto, [Validators.required]],
      matricula: [this.funcionarios.matricula, [Validators.required]],
      salario: [this.funcionarios.salario, [Validators.required]],
      cargo: [this.funcionarios.cargo, [Validators.required]]
      

    });
  }
  atualizar(){
    this.firestore.collection("funcionario").doc(this.funcionarios.id)
    .update(this.formGroup.value).then(() =>{
        console.log("cadastrado com sucesso");
        this.navCtrl.setRoot('FuncionariosPage');
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
      this.funcionarios.imagem = url; // foto baixada com sucesso
      console.log(url)
    }).catch(()=>{ //foto não existe,pega foto padrão
      this.funcionarios.imagem = "https://www.gazetadopovo.com.br/blogs/dias-da-vida/wp-content/themes/padrao/imagens/perfil-blog.png";
    })
  }
}
