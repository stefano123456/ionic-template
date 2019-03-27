import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Servico } from '../../model/servico';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import firebase from 'firebase';
import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-novo-servico',
  templateUrl: 'novo-servico.html',
})
export class NovoServicoPage {
  
  servico : Servico;
  formGroup: FormGroup;
  firestore = firebase.firestore();

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public storage: AngularFireStorage,
    public firebaseauth: AngularFireAuth
    ) {

      this.servico = this.navParams.get('servico');
      this.form();
  }
  form(){
    this.formGroup = this.formBuilder.group({
      nome: ['', [Validators.required]],
      valor: ['', [Validators.required]],
      descricao: ['', [Validators.required]]
    });
  }
  add(){
    this.firestore.collection("servico").add(
      this.formGroup.value).then(ref =>{
        console.log("cadastrado com sucesso");
        this.navCtrl.setRoot('ServicosPage');
      }).catch(err =>{
        console.log(err.mensage);
      });
  }
  /*atualizar(){
    var ref = this.firestore.collection("cliente").doc(this.cliente.id);
    ref.update(this.formGroup.value).then(()=>{
      this.navCtrl.setRoot('ClientesPage');
    }).catch(function(error) {
      console.error("Error:",error);
    });
  }*/

}
