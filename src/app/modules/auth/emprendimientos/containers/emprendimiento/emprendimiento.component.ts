import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {Emprendimiento} from "../../../../../models/Emprendimiento";
import {ActivatedRoute} from "@angular/router";
import {EmprendimientosService} from "../../../../../services/emprendimientos.service";

@Component({
  selector: 'app-emprendimiento',
  templateUrl: './emprendimiento.component.html',
  styleUrls: ['./emprendimiento.component.scss']
})
export class EmprendimientoComponent implements OnInit, OnDestroy {

  sub!: Subscription;
  selectedEmp!: Emprendimiento;
  responsiveOptions: any;

  constructor(private route: ActivatedRoute,
              private _empService: EmprendimientosService) {
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

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(({id}) => {
      if (id) {
        this.getEmpById(id);
      }
    });
  }

  getEmpById(id: number) {
    this._empService.getEmprendimiento(id).subscribe((emp: Emprendimiento) => {
      this.selectedEmp = emp;
    });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

}
