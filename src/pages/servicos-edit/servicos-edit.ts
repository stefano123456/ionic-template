import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFireAuth } from 'angularfire2/auth';
import { Servico } from '../../model/servico';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-servicos-edit',
  templateUrl: 'servicos-edit.html',
})
export class ServicosEditPage {

  servicos : Servico;
  formGroup: FormGroup;
  firestore = firebase.firestore();
  
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public storage: AngularFireStorage,
    public firebaseauth: AngularFireAuth) {
  
      this.servicos= this.navParams.get('servicos');
      this.form();
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ServicosEditPage');
  }

  form(){
    this.formGroup = this.formBuilder.group({
      nome: [this.servicos.nome, [Validators.required]],
      valor: [this.servicos.valor, [Validators.required]],
      descricao: [this.servicos.descricao, [Validators.required]]
    });
  }
  atualizar(){
    this.firestore.collection("servico").doc(this.servicos.id)
    .update(this.formGroup.value).then(() =>{
        console.log("cadastrado com sucesso");
        this.navCtrl.setRoot('ServicosPage');
      }).catch(err =>{
        console.log(err.mensage);
      });
  }
}
