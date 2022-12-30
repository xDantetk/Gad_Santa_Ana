import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BandejaComponent} from "./containers/bandeja/bandeja.component";

const routes: Routes = [
  {
    path: '',
    component: BandejaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BandejaContactanosRoutingModule {
}
