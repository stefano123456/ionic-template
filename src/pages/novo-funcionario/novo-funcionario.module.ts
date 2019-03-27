import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NovoFuncionarioPage } from './novo-funcionario';

@NgModule({
  declarations: [
    NovoFuncionarioPage,
  ],
  imports: [
    IonicPageModule.forChild(NovoFuncionarioPage),
  ],
})
export class NovoFuncionarioPageModule {}
