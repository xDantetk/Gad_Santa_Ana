import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminProyectosComponent} from "./containers/admin-proyectos/admin-proyectos.component";
import {AdminProyectoComponent} from "./containers/admin-proyecto/admin-proyecto.component";

const routes: Routes = [
  {
    path: '',
    component: AdminProyectosComponent
  },
  {
    path: 'edit/:id',
    component: AdminProyectoComponent
  },
  {
    path: 'create',
    component: AdminProyectoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProyectosRoutingModule {
}
