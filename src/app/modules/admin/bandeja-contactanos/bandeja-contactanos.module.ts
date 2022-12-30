import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BandejaContactanosRoutingModule } from './bandeja-contactanos-routing.module';
import { BandejaComponent } from './containers/bandeja/bandeja.component';


@NgModule({
  declarations: [
    BandejaComponent
  ],
  imports: [
    CommonModule,
    BandejaContactanosRoutingModule
  ]
})
export class BandejaContactanosModule { }
