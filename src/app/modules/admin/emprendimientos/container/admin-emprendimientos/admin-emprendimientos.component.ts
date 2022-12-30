import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {Emprendimiento} from "../../../../../models/Emprendimiento";
import {EmprendimientosService} from "../../../../../services/emprendimientos.service";
import {setLoadingSpinner} from "../../../../../store/shared/shared.actions";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../../store/app.state";

@Component({
  selector: 'app-admin-emprendimientos',
  templateUrl: './admin-emprendimientos.component.html',
  styleUrls: ['./admin-emprendimientos.component.scss']
})
export class AdminEmprendimientosComponent implements OnInit, OnDestroy {

  subs!: Subscription;
  emprendimientos: Emprendimiento[] = [];

  constructor(private _empService: EmprendimientosService,
              private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.store.dispatch(setLoadingSpinner({status: true}));
    this.subs = this._empService.getAllEmprendimientos().subscribe(emp => {
      this.emprendimientos = emp as Emprendimiento[];
      this.store.dispatch(setLoadingSpinner({status: false}));
    });
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe()
    }
  }

}
