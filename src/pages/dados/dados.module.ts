import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DadosPage } from './dados';

@NgModule({
  declarations: [
    DadosPage,
  ],
  imports: [
    IonicPageModule.forChild(DadosPage),
  ],
})
export class DadosPageModule {}
