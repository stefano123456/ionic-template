import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LivrosPage } from './livros';

@NgModule({
  declarations: [
    LivrosPage,
  ],
  imports: [
    IonicPageModule.forChild(LivrosPage),
  ],
})
export class LivrosPageModule {}
