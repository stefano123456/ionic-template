import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ServicosEditPage } from './servicos-edit';

@NgModule({
  declarations: [
    ServicosEditPage,
  ],
  imports: [
    IonicPageModule.forChild(ServicosEditPage),
  ],
})
export class ServicosEditPageModule {}
