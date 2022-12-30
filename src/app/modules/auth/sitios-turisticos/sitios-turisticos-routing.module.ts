import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SitiosTuristicosComponent} from "./containers/sitios-turisticos/sitios-turisticos.component";
import {SitioTuristicoComponent} from "./containers/sitio-turistico/sitio-turistico.component";

const routes: Routes = [
  {
    path: '',
    component: SitiosTuristicosComponent
  },
  {
    path: ':id',
    component: SitioTuristicoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SitiosTuristicosRoutingModule {
}
