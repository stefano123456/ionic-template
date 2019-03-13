import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AutoresPage } from '../pages/autores/autores';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LivrosPage } from '../pages/livros/livros';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: string = 'LoginPage';

  pages: Array<{title: string, component: string}>;

  constructor(public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public firebaseauth: AngularFireAuth ) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component:  'HomePage' },
      { title: 'Livros', component:  'LivrosPage' },
      { title: 'List', component: 'ListPage' },
      { title: 'Autores', component: 'AutoresPage' },
      { title: 'Meus Dados', component: 'DadosPage' }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    this.firebaseauth.authState
      .subscribe(
      user => {
      if (user) {
      this.rootPage = 'HomePage';
      } else {
      this.rootPage = 'LoginPage';
      }
      },
      () => {
      this.rootPage = 'HomePage';
      }
      );
      }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
