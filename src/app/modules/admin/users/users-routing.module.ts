import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminUsersComponent} from "./containers/admin-users/admin-users.component";
import {AdminUserComponent} from "./containers/admin-user/admin-user.component";

const routes: Routes = [
  {
    path: '',
    component: AdminUsersComponent
  },
  {
    path: 'edit/:id',
    component: AdminUserComponent
  },
  {
    path: 'create',
    component: AdminUserComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {
}
