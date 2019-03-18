import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Post } from '../../model/post';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-post-edit',
  templateUrl: 'post-edit.html',
})
export class PostEditPage {
    post : Post;
    formGroup: FormGroup;
    firestore = firebase.firestore();
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public formBuilder: FormBuilder) {

      this.post = this.navParams.get('post');
      this.form();
    }
  form(){
    this.formGroup = this.formBuilder.group({
      uid: [this.post.uid, [Validators.required]],
      nome: [this.post.nome, [Validators.required]],
      mensagem: [this.post.mensagem, [Validators.required]]
    });
  }
  atualizar(){
    var ref = this.firestore.collection("post").doc(this.post.id);
    ref.update(this.formGroup.value).then(()=>{
      this.navCtrl.setRoot('HomePage');
    }).catch(function(error) {
      console.error("Error:",error);
    });
  }


}
