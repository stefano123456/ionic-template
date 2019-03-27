import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NovoClientePage } from './novo-cliente';

@NgModule({
  declarations: [
    NovoClientePage,
  ],
  imports: [
    IonicPageModule.forChild(NovoClientePage),
  ],
})
export class NovoClientePageModule {}
