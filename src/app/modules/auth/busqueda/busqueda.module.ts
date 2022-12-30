import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BusquedaRoutingModule } from './busqueda-routing.module';
import { BusquedaComponent } from './containers/busqueda/busqueda.component';


@NgModule({
  declarations: [
    BusquedaComponent
  ],
  imports: [
    CommonModule,
    BusquedaRoutingModule
  ]
})
export class BusquedaModule { }
