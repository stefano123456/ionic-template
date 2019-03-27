import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClientesEditPage } from './clientes-edit';

@NgModule({
  declarations: [
    ClientesEditPage,
  ],
  imports: [
    IonicPageModule.forChild(ClientesEditPage),
  ],
})
export class ClientesEditPageModule {}
