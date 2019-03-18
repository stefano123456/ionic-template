import { Component } from '@angular/core';
import { NavController, IonicPage, MenuController } from 'ionic-angular';
import firebase from 'firebase';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireStorage } from 'angularfire2/storage';

import { Post } from '../../model/post';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
@IonicPage()
export class HomePage {

  
    firestore = firebase.firestore();
    formGroup : FormGroup;
    uid: string;
    posts: Post[] = [];

  constructor(public navCtrl: NavController,
  public menuCtrl: MenuController,
  public firebaseauth: AngularFireAuth,
  public formBuilder: FormBuilder,
  public storage: AngularFireStorage) {

    
   this.firebaseauth.authState.subscribe(user =>{
     if (user){this.uid = user.uid}
   });
    this.menuCtrl.enable(true);
    this.form();
  }

  ionViewDidLoad(){
    this.getList();
  }

  form(){
    this.formGroup = this.formBuilder.group({
      uid : ['',[Validators.required]],
      nome : ['',[Validators.required]],
      mensagem : ['',[Validators.required]]
    });
  }
  //list
  getList(){
    var postRef = firebase.firestore().collection('post');

    postRef.get().then(query =>{
      query.forEach(doc =>{
        let p = new Post();
        p.id = doc.id; 
        p.setDados(doc.data());
        this.posts.push(p);
      });
     // console.log(this.posts);
    });
  }
  //cadastrar
  add(){
    //será modificado
    this.formGroup.controls['uid'].setValue(this.uid);
    this.formGroup.controls['nome'].setValue('adafsdsa')
//tenta cadastrar a mensagem
this.firestore.collection("post").add(
  this.formGroup.value
).then(ref =>{
  //sucesso
  //console.log("cadastrado com sucesso");
  this.posts = [];
  this.getList();
}).catch(err =>{
  //console.log(err.message);
});
  }
  removerPost(id : string){
    this.firestore.collection('post').doc(id).delete().then(()=>{
      //console.log("Documento deletado");
      this.posts =[];
      this.getList();
    }).catch(function(error){
     //console.error("Error:",error);
    });
  }
  editar(post : Post){
    this.navCtrl.push('PostEditPage',{'post' : post})
  }
}
