import { Component } from '@angular/core';
import { NavController, IonicPage, MenuController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
@IonicPage()
export class HomePage {

  constructor(public navCtrl: NavController,
  public menuCtrl: MenuController) {
    
    this.menuCtrl.enable(true);
  
  }

}
