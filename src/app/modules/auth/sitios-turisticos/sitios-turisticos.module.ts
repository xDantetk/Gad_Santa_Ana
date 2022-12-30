import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SitiosTuristicosRoutingModule } from './sitios-turisticos-routing.module';
import { SitiosTuristicosComponent } from './containers/sitios-turisticos/sitios-turisticos.component';
import { SitioTuristicoComponent } from './containers/sitio-turistico/sitio-turistico.component';
import { CardSitioComponent } from './components/card-sitio/card-sitio.component';
import {CarouselModule} from "primeng/carousel";
import {ButtonModule} from "primeng/button";


@NgModule({
  declarations: [
    SitiosTuristicosComponent,
    SitioTuristicoComponent,
    CardSitioComponent
  ],
  imports: [
    CommonModule,
    SitiosTuristicosRoutingModule,
    CarouselModule,
    ButtonModule
  ]
})
export class SitiosTuristicosModule { }
