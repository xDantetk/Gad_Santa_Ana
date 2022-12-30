import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactanosRoutingModule } from './contactanos-routing.module';
import { ContactanosComponent } from './containers/contactanos/contactanos.component';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    ContactanosComponent
  ],
  imports: [
    CommonModule,
    ContactanosRoutingModule,
    ReactiveFormsModule
  ]
})
export class ContactanosModule { }
