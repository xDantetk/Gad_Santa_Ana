import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProyectosRoutingModule} from './proyectos-routing.module';
import {ProyectosComponent} from './containers/proyectos/proyectos.component';
import {TabViewModule} from "primeng/tabview";
import {CarouselModule} from "primeng/carousel";


@NgModule({
  declarations: [
    ProyectosComponent,
  ],
  imports: [
    CommonModule,
    ProyectosRoutingModule,
    TabViewModule,
    CarouselModule
  ]
})
export class ProyectosModule {
}
