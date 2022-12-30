import {Component, OnInit} from '@angular/core';
import * as AOS from 'aos';
import {Observable} from "rxjs";
import {AppState} from "./store/app.state";
import {Store} from "@ngrx/store";
import {getLoading} from "./store/shared/shared.selector";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  showLoading$?: Observable<boolean>;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
    AOS.init();
    window.addEventListener('load', AOS.refresh);
    this.showLoading$ = this.store.select(getLoading);
  }

}
