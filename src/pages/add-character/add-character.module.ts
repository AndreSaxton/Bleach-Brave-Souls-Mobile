import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddCharacterPage } from './add-character';

@NgModule({
  declarations: [
    AddCharacterPage,
  ],
  imports: [
    IonicPageModule.forChild(AddCharacterPage),
  ],
})
export class AddCharacterPageModule {}
