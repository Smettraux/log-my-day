import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewPlacePageRoutingModule } from './new-place-routing.module';

import { NewPlacePage } from './new-place.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewPlacePageRoutingModule
  ],
  declarations: [NewPlacePage]
})
export class NewPlacePageModule {}
