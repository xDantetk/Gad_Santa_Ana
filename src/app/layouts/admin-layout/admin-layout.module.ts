import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminLayoutRoutingModule} from './admin-layout-routing.module';
import {NavbarAdminComponent} from './navbar-admin/navbar-admin.component';
import {SidebarAdminComponent} from './sidebar-admin/sidebar-admin.component';
import {AdminLayoutComponent} from "./admin-layout.component";


@NgModule({
  declarations: [
    AdminLayoutComponent,
    NavbarAdminComponent,
    SidebarAdminComponent
  ],
  imports: [
    CommonModule,
    AdminLayoutRoutingModule
  ]
})
export class AdminLayoutModule {
}
