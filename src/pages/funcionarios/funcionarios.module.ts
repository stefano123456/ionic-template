import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FuncionariosPage } from './funcionarios';

@NgModule({
  declarations: [
    FuncionariosPage,
  ],
  imports: [
    IonicPageModule.forChild(FuncionariosPage),
  ],
})
export class FuncionariosPageModule {}
