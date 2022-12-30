import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminSitiosTuristicosComponent} from "./containers/admin-sitios-turisticos/admin-sitios-turisticos.component";
import {AdminSitioTuristicoComponent} from "./containers/admin-sitio-turistico/admin-sitio-turistico.component";

const routes: Routes = [
  {
    path: '',
    component: AdminSitiosTuristicosComponent
  },
  {
    path: 'edit/:id',
    component: AdminSitioTuristicoComponent
  },
  {
    path: 'create',
    component: AdminSitioTuristicoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TurismoRoutingModule {
}
