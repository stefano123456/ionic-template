import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NovoServicoPage } from './novo-servico';

@NgModule({
  declarations: [
    NovoServicoPage,
  ],
  imports: [
    IonicPageModule.forChild(NovoServicoPage),
  ],
})
export class NovoServicoPageModule {}
