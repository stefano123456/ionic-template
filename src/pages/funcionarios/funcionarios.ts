import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import firebase from 'firebase';
import { Funcionario } from '../../model/funcionario';
import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-funcionarios',
  templateUrl: 'funcionarios.html',
})
export class FuncionariosPage {
  firestore = firebase.firestore();
  settings = {timestampsInSnapshots:true};
  funcionarios: Funcionario[] = [];
  uid : string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public storage : AngularFireStorage,
    public firebaseauth: AngularFireAuth,
    public toastCtrl : ToastController,
    public loadingCtrl : LoadingController) {
    this.firestore.settings(this.settings);

  
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
    console.log('ionViewDidLoad FuncionariosPage');
    this.listaFuncionario();
  }
listaFuncionario(){
  var ref = firebase.firestore().collection("funcionario");
  ref.get().then(query =>{
    
    query.forEach(doc =>{
      //console.log(doc.data());
      let liv = new Funcionario(doc.data());
      liv.id = doc.id;
      firebase.storage().ref().child('usuario/'+liv.id+'.jpg') // Referência do arquivo no servidor
      .getDownloadURL().then( url=>{ // tenta baixar a foto do servidor
        liv.imagem = url; // foto baixada com sucesso
      }).catch(()=>{ // foto não existe, pega foto padrão
        liv.imagem = "https://www.gazetadopovo.com.br/blogs/dias-da-vida/wp-content/themes/padrao/imagens/perfil-blog.png";
      })        
      //console.log(liv);
      this.funcionarios.push(liv);
    });
    //console.log(this.funcionarios);
  });
}
excluir(fc : Funcionario){
  this.loader.present();//inicia o loading
this.firestore.collection('funcionario').doc(fc.id).delete().then(()=>{
  this.loader.dismiss();
  this.funcionarios = [];
  this.listaFuncionario();
  this.toast('Excluido com sucesso');
}).catch(function(error){
  this.loader.dismiss();
  this.toast('Erro ao excluir')

});
}
editar( fc : Funcionario){
  this.navCtrl.push('FuncionariosEditPage',{'funcionarios' : fc})
}
downloadFoto(uid : string) : any{
    
  let ref = 'usuario/'+uid+'.jpg'; // Pasta do servidor
  let gsReference = firebase.storage().ref().child(ref); // Referência do arquivo no servidor

  gsReference.getDownloadURL().then( url=>{ // tenta baixar a foto do servidor
    return url; // foto baixada com sucesso
  }).catch(()=>{ // foto não existe, pega foto padrão
    return "https://www.gazetadopovo.com.br/blogs/dias-da-vida/wp-content/themes/padrao/imagens/perfil-blog.png";
  })

}
PGnf(){
  this.navCtrl.push('NovoFuncionarioPage')
}
}