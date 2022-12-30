import {Component, OnDestroy, OnInit} from '@angular/core';
import {SitiosTuristicosService} from "../../../../../services/sitios-turisticos.service";
import {Subscription} from "rxjs";
import {SitioTuristico} from "../../../../../models/SitioTuristico";
import {setLoadingSpinner} from "../../../../../store/shared/shared.actions";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../../store/app.state";

@Component({
  selector: 'app-sitios-turisticos',
  templateUrl: './admin-sitios-turisticos.component.html',
  styleUrls: ['./admin-sitios-turisticos.component.scss']
})
export class AdminSitiosTuristicosComponent implements OnInit, OnDestroy {

  subs!: Subscription;
  sitios: SitioTuristico[] = [];

  constructor(private _turismoService: SitiosTuristicosService,
              private store: Store<AppState>) {
  }

  ngOnInit(): void {

    this.store.dispatch(setLoadingSpinner({status: true}));

    this.subs = this._turismoService.getAllSitios().subscribe(sitios => {
      this.sitios = sitios as SitioTuristico[];
      this.store.dispatch(setLoadingSpinner({status: false}));
    });

  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }

}
