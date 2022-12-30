import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EmprendimientosComponent} from "./containers/emprendimientos/emprendimientos.component";
import {EmprendimientoComponent} from "./containers/emprendimiento/emprendimiento.component";

const routes: Routes = [
  {
    path: '',
    component: EmprendimientosComponent
  },
  {
    path: ':id',
    component: EmprendimientoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmprendimientosRoutingModule {
}
