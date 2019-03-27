import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Cliente } from '../../model/cliente';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import firebase from 'firebase';
import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-novo-cliente',
  templateUrl: 'novo-cliente.html',
})
export class NovoClientePage {
  
  cliente : Cliente;
  formGroup: FormGroup;
  firestore = firebase.firestore();

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public storage: AngularFireStorage,
    public firebaseauth: AngularFireAuth
    ) {

      this.cliente = this.navParams.get('cliente');
      this.form();
  }
  form(){
    this.formGroup = this.formBuilder.group({
      nome: ['', [Validators.required]],
      email: ['', [Validators.required]],
      telefone: ['', [Validators.required]],
      endereco: ['', [Validators.required]],
      cep: ['', [Validators.required]],
      cidade: ['', [Validators.required]],
      bairro: ['', [Validators.required]]

    });
  }
  add(){
    this.firestore.collection("cliente").add(
      this.formGroup.value).then(ref =>{
        console.log("cadastrado com sucesso");
        this.navCtrl.setRoot('ClientesPage');
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
