import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AuthLayoutRoutingModule} from './auth-layout-routing.module';
import {AuthLayoutComponent} from './auth-layout.component';
import {NavbarComponent} from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    AuthLayoutComponent,
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    AuthLayoutRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AuthLayoutModule {
}
