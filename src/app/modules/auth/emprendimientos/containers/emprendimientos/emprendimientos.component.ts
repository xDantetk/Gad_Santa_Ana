import {Component, OnDestroy, OnInit} from '@angular/core';
import {EmprendimientosService} from "../../../../../services/emprendimientos.service";
import {Subscription} from "rxjs";
import {Emprendimiento} from "../../../../../models/Emprendimiento";

@Component({
  selector: 'app-emprendimientos',
  templateUrl: './emprendimientos.component.html',
  styleUrls: ['./emprendimientos.component.scss']
})
export class EmprendimientosComponent implements OnInit, OnDestroy {

  sub!: Subscription;
  emprendimientos: Emprendimiento[] = [];
  categorias = ['Todas las categorias', 'Alimentos', 'Comercio', 'Farmacias', 'Hosterías', 'Varios'];

  constructor(private _empService: EmprendimientosService) {
  }

  ngOnInit(): void {
    this.sub = this._empService.getAllEmprendimientos().subscribe(emp => {
      this.emprendimientos = emp as Emprendimiento[];
    });
  }

  searchSelected(ev: any) {
    const categoria = ev.originalEvent.target.innerText;
    if (categoria === 'Todas las categorias') {
      this.sub = this._empService.getAllEmprendimientos().subscribe(emp => {
        this.emprendimientos = emp as Emprendimiento[];
      });
    } else {
      this.sub = this._empService.getEmprendimientoByCategory(categoria).subscribe(emp => {
        this.emprendimientos = emp as Emprendimiento[];
      });
    }
  }

  ngOnDestroy() {
    if (this.sub) {      this.sub.unsubscribe()
    }
  }

}
