import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {forkJoin, lastValueFrom, Observable, Subscription} from "rxjs";
import {ProyectosService} from "../../../../../services/proyectos.service";
import {SitiosTuristicosService} from "../../../../../services/sitios-turisticos.service";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../../store/app.state";
import {setLoadingSpinner} from "../../../../../store/shared/shared.actions";
import {getLoading} from "../../../../../store/shared/shared.selector";

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.scss']
})
export class BusquedaComponent implements OnInit, OnDestroy {

  sub!: Subscription;
  msg = '';
  results: Busqueda[] = [];
  loading$!: Observable<boolean>

  constructor(private route: ActivatedRoute,
              private _proyectosService: ProyectosService,
              private _turismoService: SitiosTuristicosService,
              private store: Store<AppState>) {
  }

  ngOnInit(): void {

    this.loading$ = this.store.select(getLoading);

    this.sub = this.route.queryParams.subscribe(({msg}) => {
      this.store.dispatch(setLoadingSpinner({status: true}));
      this.msg = msg;

      forkJoin([this._proyectosService.getAllProyectos(), this._turismoService.getAllSitios()]).toPromise().then((result: any) => {
        const busqueda: Busqueda[] = [];
        for (const [i, r] of result.entries()) {
          const aux = r.map((item: any) => {
            return {
              tipo: i === 0 ? 'Proyectos' : 'Sitios Turísticos',
              nombre: item['nombre'],
              descripcion: item['descripcion'],
              url: i === 0 ? '/proyectos' : '/sitios-turisticos/' + item['id']
            };
          })
          busqueda.push(...aux);
        }
        this.doFilter(msg, busqueda);
      })
    })
  }

  doFilter(msg: string, busqueda: any[]) {
    if (msg != '' && msg != null) {
      const msgAux = msg.toLowerCase();
      this.results = busqueda.filter(t => t['descripcion'].toLowerCase().includes(msgAux) || t['nombre'].toLowerCase().includes(msgAux));
    }
    this.store.dispatch(setLoadingSpinner({status: false}));
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

}

export interface Busqueda {
  tipo: string;
  nombre: string;
  descripcion: string;
  url: string;
}
