import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-logoff',
  templateUrl: 'logoff.html',
})
export class LogoffPage {

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
    public angularfireauth: AngularFireAuth) {
  }

  ionViewDidLoad() {
    this.angularfireauth.auth.signOut().catch().then();
  }

}
