import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminEmprendimientosComponent} from "./container/admin-emprendimientos/admin-emprendimientos.component";
import {AdminEmprendimientoComponent} from "./container/admin-emprendimiento/admin-emprendimiento.component";

const routes: Routes = [
  {
    path: '',
    component: AdminEmprendimientosComponent,
  },
  {
    path: 'edit/:id',
    component: AdminEmprendimientoComponent,
  },
  {
    path: 'create',
    component: AdminEmprendimientoComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmprendimientosRoutingModule {
}
