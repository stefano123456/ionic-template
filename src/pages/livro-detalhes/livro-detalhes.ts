import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Livro } from '../../model/livro';

/**
 * Generated class for the LivroDetalhesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-livro-detalhes',
  templateUrl: 'livro-detalhes.html',
})
export class LivroDetalhesPage {
  //variável para os dados do livro
    livro: Livro;

  constructor(public navCtrl: NavController,
     public navParams: NavParams) {
       //receber o parâmetro livro -> {'livro' : 'obj';}
      this.livro = this.navParams.get('livro');
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LivroDetalhesPage');
  }

}
