import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FuncionariosEditPage } from './funcionarios-edit';

@NgModule({
  declarations: [
    FuncionariosEditPage,
  ],
  imports: [
    IonicPageModule.forChild(FuncionariosEditPage),
  ],
})
export class FuncionariosEditPageModule {}
