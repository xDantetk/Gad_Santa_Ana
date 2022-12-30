import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('../../modules/auth/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'proyectos',
    loadChildren: () => import('../../modules/auth/proyectos/proyectos.module').then(m => m.ProyectosModule)
  },
  {
    path: 'sitios-turisticos',
    loadChildren: () => import('../../modules/auth/sitios-turisticos/sitios-turisticos.module').then(m => m.SitiosTuristicosModule)
  },
  {
    path: 'emprendimientos',
    loadChildren: () => import('../../modules/auth/emprendimientos/emprendimientos.module').then(m => m.EmprendimientosModule)
  },
  {
    path: 'contactanos',
    loadChildren: () => import('../../modules/auth/contactanos/contactanos.module').then(m => m.ContactanosModule)
  },
  {
    path: 'busqueda',
    loadChildren: () => import('../../modules/auth/busqueda/busqueda.module').then(m => m.BusquedaModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthLayoutRoutingModule {
}
