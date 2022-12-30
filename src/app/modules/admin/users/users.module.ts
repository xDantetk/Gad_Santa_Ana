import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { AdminUsersComponent } from './containers/admin-users/admin-users.component';
import { AdminUserComponent } from './containers/admin-user/admin-user.component';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    AdminUsersComponent,
    AdminUserComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    ReactiveFormsModule
  ]
})
export class UsersModule { }
