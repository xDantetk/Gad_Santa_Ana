import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {environment} from '../environments/environment';
import {provideAuth, getAuth} from '@angular/fire/auth';
import {provideFirestore, getFirestore} from '@angular/fire/firestore';
import {AngularFireModule} from "@angular/fire/compat";
import { LoginComponent } from './pages/login/login.component';
import {ReactiveFormsModule} from "@angular/forms";
import {ROOT_REDUCER} from "./store/app.state";
import {StoreModule} from "@ngrx/store";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {LoadingSpinnerComponent} from "./shared/loading-spinner/loading-spinner.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    ReactiveFormsModule,
    StoreModule.forRoot(ROOT_REDUCER),
    StoreDevtoolsModule.instrument({
      logOnly: environment.production
    }),
    LoadingSpinnerComponent,
    /*provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())*/
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
