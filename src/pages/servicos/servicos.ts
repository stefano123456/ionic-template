import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, MenuController } from 'ionic-angular';
import firebase from 'firebase';
import { Servico } from '../../model/servico';
import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-servicos',
  templateUrl: 'servicos.html',
})
export class ServicosPage {
  firestore = firebase.firestore();
  settings = {timestampsInSnapshots:true};
  servicos: Servico[] = [];
  uid : string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public storage : AngularFireStorage,
    public firebaseauth: AngularFireAuth,
    public toastCtrl : ToastController,
    public menuCtrl: MenuController,
    public loadingCtrl : LoadingController) {
    this.firestore.settings(this.settings);
      this.menuCtrl.enable(true);
  
  }
  loader = this.loadingCtrl.create({
    content: "Aguarde...",
    duration: 3000
  });

  toast(text : string){
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClientesPage');
    this.listaServico();
  }
listaServico(){
  var ref = firebase.firestore().collection("servico");
  ref.get().then(query =>{
    
    query.forEach(doc =>{
      //console.log(doc.data());
      let liv = new Servico(doc.data());
      liv.id = doc.id;
      //console.log(liv);
      this.servicos.push(liv);
    });
    //console.log(this.clientes);
  });
}
excluir(se : Servico){
  this.loader.present();//inicia o loading
this.firestore.collection('servico').doc(se.id).delete().then(()=>{
  this.loader.dismiss();
  this.servicos = [];
  this.listaServico();
  this.toast('Excluido com sucesso');
}).catch(function(error){
  this.loader.dismiss();
  this.toast('Erro ao excluir')

});
}
editar( se : Servico){
  this.navCtrl.push('ServicosEditPage',{'servicos' : se})
}
PGns(){
  this.navCtrl.push('NovoServicoPage')
}
}
