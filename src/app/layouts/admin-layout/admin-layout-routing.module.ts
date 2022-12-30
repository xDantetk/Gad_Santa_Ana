import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadChildren: () => import('../../modules/admin/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'turismo',
    loadChildren: () => import('../../modules/admin/turismo/turismo.module').then(m => m.TurismoModule)
  },
  {
    path: 'emprendimientos',
    loadChildren: () => import('../../modules/admin/emprendimientos/emprendimientos.module').then(m => m.EmprendimientosModule)
  },
  {
    path: 'proyectos',
    loadChildren: () => import('../../modules/admin/proyectos/proyectos.module').then(m => m.ProyectosModule)
  },
  {
    path: 'users',
    loadChildren: () => import('../../modules/admin/users/users.module').then(m => m.UsersModule)
  },
  {
    path: 'bandeja',
    loadChildren: () => import('../../modules/admin/bandeja-contactanos/bandeja-contactanos.module').then(m => m.BandejaContactanosModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminLayoutRoutingModule {
}
