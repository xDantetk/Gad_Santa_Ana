import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TurismoRoutingModule } from './turismo-routing.module';
import { AdminSitiosTuristicosComponent } from './containers/admin-sitios-turisticos/admin-sitios-turisticos.component';
import { AdminSitioTuristicoComponent } from './containers/admin-sitio-turistico/admin-sitio-turistico.component';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    AdminSitiosTuristicosComponent,
    AdminSitioTuristicoComponent
  ],
  imports: [
    CommonModule,
    TurismoRoutingModule,
    ReactiveFormsModule
  ]
})
export class TurismoModule { }
