import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {Mensaje} from "../../../../../models/Mensaje";
import {BandejaService} from "../../../../../services/bandeja.service";
import {setLoadingSpinner} from "../../../../../store/shared/shared.actions";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../../store/app.state";

@Component({
  selector: 'app-bandeja',
  templateUrl: './bandeja.component.html',
  styleUrls: ['./bandeja.component.scss']
})
export class BandejaComponent implements OnInit, OnDestroy {

  subs!: Subscription;
  selectedMensaje?: Mensaje;
  mensajes: Mensaje[] = [];

  constructor(private _bandejaService: BandejaService,
              private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.store.dispatch(setLoadingSpinner({status: true}));
    this.subs = this._bandejaService.getAllMessages().subscribe(mensajes => {
      this.mensajes = mensajes as Mensaje[];
      this.store.dispatch(setLoadingSpinner({status: false}));
    });
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }

}
