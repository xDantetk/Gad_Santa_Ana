import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProyectosRoutingModule } from './proyectos-routing.module';
import { AdminProyectosComponent } from './containers/admin-proyectos/admin-proyectos.component';
import { AdminProyectoComponent } from './containers/admin-proyecto/admin-proyecto.component';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    AdminProyectosComponent,
    AdminProyectoComponent
  ],
  imports: [
    CommonModule,
    ProyectosRoutingModule,
    ReactiveFormsModule
  ]
})
export class ProyectosModule { }
