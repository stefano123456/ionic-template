import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Funcionario } from '../../model/funcionario';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import firebase from 'firebase';
import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-novo-funcionario',
  templateUrl: 'novo-funcionario.html',
})
export class NovoFuncionarioPage {
  
  funcionario : Funcionario;
  formGroup: FormGroup;
  firestore = firebase.firestore();

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public storage: AngularFireStorage,
    public firebaseauth: AngularFireAuth
    ) {

      this.funcionario = this.navParams.get('funcionario');
      this.form();
  }
  form(){
    this.formGroup = this.formBuilder.group({
      nomeCompleto: ['', [Validators.required]],
      matricula: ['', [Validators.required]],
      salario: ['', [Validators.required]],
      cargo: ['', [Validators.required]]

    });
  }
  add(){
    this.firestore.collection("funcionario").add(
      this.formGroup.value).then(ref =>{
        console.log("cadastrado com sucesso");
        this.navCtrl.setRoot('FuncionariosPage');
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