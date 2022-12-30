import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProyectosService} from "../../../../../services/proyectos.service";
import {Subscription} from "rxjs";
import {Proyecto} from "../../../../../models/Proyecto";

@Component({
  selector: 'app-proyectos-container',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.scss']
})
export class ProyectosComponent implements OnInit, OnDestroy {

  subs!: Subscription;
  proyectos: Proyecto[] = [];
  selectedProyecto?: Proyecto;

  responsiveOptions: any;

  constructor(private _proyectosService: ProyectosService) {
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  }

  searchSelected(ev: any) {
    const year = parseInt(ev.originalEvent.target.innerText);
    this.subs = this._proyectosService.getActiveProyectosByYear(year).subscribe(proyectos => {
      this.proyectos = proyectos as Proyecto[];
    })
  }

  ngOnInit(): void {
    this.subs = this._proyectosService.getActiveProyectosByYear(2019).subscribe(proyectos => {
      this.proyectos = proyectos as Proyecto[];
    })
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }

}
