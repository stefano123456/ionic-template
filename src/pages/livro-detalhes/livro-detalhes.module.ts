import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LivroDetalhesPage } from './livro-detalhes';

@NgModule({
  declarations: [
    LivroDetalhesPage,
  ],
  imports: [
    IonicPageModule.forChild(LivroDetalhesPage),
  ],
})
export class LivroDetalhesPageModule {}
