import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmprendimientosRoutingModule } from './emprendimientos-routing.module';
import { AdminEmprendimientoComponent } from './container/admin-emprendimiento/admin-emprendimiento.component';
import { AdminEmprendimientosComponent } from './container/admin-emprendimientos/admin-emprendimientos.component';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    AdminEmprendimientoComponent,
    AdminEmprendimientosComponent
  ],
  imports: [
    CommonModule,
    EmprendimientosRoutingModule,
    ReactiveFormsModule
  ]
})
export class EmprendimientosModule { }
