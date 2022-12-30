import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ProyectosService} from "../../../../../services/proyectos.service";
import {Proyecto} from "../../../../../models/Proyecto";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../../store/app.state";
import {setLoadingSpinner} from "../../../../../store/shared/shared.actions";

@Component({
  selector: 'app-admin-proyectos',
  templateUrl: './admin-proyectos.component.html',
  styleUrls: ['./admin-proyectos.component.scss']
})
export class AdminProyectosComponent implements OnInit, OnDestroy {

  subs!: Subscription;
  proyectos: Proyecto[] = [];

  constructor(private _proyectosService: ProyectosService,
              private store: Store<AppState>) {
  }

  ngOnInit(): void {

    this.store.dispatch(setLoadingSpinner({status: true}));

    this.subs = this._proyectosService.getAllProyectos().subscribe(proyectos => {
      this.proyectos = proyectos as Proyecto[];

      this.store.dispatch(setLoadingSpinner({status: false}));
    });
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }

}
