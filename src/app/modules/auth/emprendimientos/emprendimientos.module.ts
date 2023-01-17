import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmprendimientosRoutingModule } from './emprendimientos-routing.module';
import { EmprendimientosComponent } from './containers/emprendimientos/emprendimientos.component';
import {TabViewModule} from "primeng/tabview";
import { EmprendimientoComponent } from './containers/emprendimiento/emprendimiento.component';
import {CarouselModule} from "primeng/carousel";
import {ButtonModule} from "primeng/button";


@NgModule({
  declarations: [
    EmprendimientosComponent,
    EmprendimientoComponent
  ],
  imports: [
    CommonModule,
    EmprendimientosRoutingModule,
    TabViewModule,
    CarouselModule,
    ButtonModule
  ]
})
export class EmprendimientosModule { }
