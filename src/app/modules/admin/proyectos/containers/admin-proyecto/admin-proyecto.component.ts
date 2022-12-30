import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ProyectosService} from "../../../../../services/proyectos.service";
import {Proyecto} from "../../../../../models/Proyecto";
import Swal from "sweetalert2";
import {StorageService} from "../../../../../services/storage.service";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../../store/app.state";
import {setLoadingSpinner} from "../../../../../store/shared/shared.actions";

@Component({
  selector: 'app-admin-proyecto',
  templateUrl: './admin-proyecto.component.html',
  styleUrls: ['./admin-proyecto.component.scss']
})
export class AdminProyectoComponent implements OnInit, OnDestroy {

  sub!: Subscription;
  subProyecto?: Subscription;
  proyectoForm!: FormGroup;
  isEdit = false;

  constructor(private route: ActivatedRoute,
              private _proyectosService: ProyectosService,
              private _storageService: StorageService,
              private router: Router,
              private fb: FormBuilder,
              private store: Store<AppState>) {
    this.initProyectoForm();
  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(({id}) => {
      if (id) {
        this.store.dispatch(setLoadingSpinner({status: true}));
        this.isEdit = true;
        this.getProyectoById(id);
      }
    })
  }

  getProyectoById(id: number) {
    this._proyectosService.getProyecto(id).subscribe((proyecto: Proyecto) => {
      this.proyectoForm.patchValue({
        id: proyecto.id,
        nombre: proyecto.nombre,
        descripcion: proyecto.descripcion,
        anio: proyecto.anio,
        estado: proyecto.estado,
        banner: proyecto.banner
      });
      this.store.dispatch(setLoadingSpinner({status: false}));
    })
  }

  initProyectoForm() {
    this.proyectoForm = this.fb.group({
      id: [Date.now(), Validators.required],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      anio: [0, Validators.required],
      estado: [false, Validators.required],
      banner: ['', Validators.required]
    });
  }

  get getNameControl() {
    return this.proyectoForm.get('nombre');
  }

  get getDescriptionControl() {
    return this.proyectoForm.get('descripcion');
  }

  get getAnioControl() {
    return this.proyectoForm.get('anio');
  }

  get getEstadoControl() {
    return this.proyectoForm.get('estado');
  }

  get getBannerControl() {
    return this.proyectoForm.get('banner');
  }

  onFileChange(event: any) {

    if (event.target.files.length > 0) {
      const file: File = event.target.files[0];
      this._storageService.uploadFile('/proyectos/' + this.proyectoForm.get('id')?.value + '/banner/' + file.name, file).then((url: string) => {
        this.proyectoForm.patchValue({
          banner: url,
        });
      });
    }
  }

  removeAttached(url: string) {
    this._storageService.removeFile(url).then(() => {
      this.proyectoForm.patchValue({
        banner: "",
      });
    });
  }

  saveForm() {
    if (!this.proyectoForm.valid) {
      this.proyectoForm.markAllAsTouched();
      return;
    }

    const proyectoToSave: Proyecto = {
      ...this.proyectoForm.value
    };

    Swal.fire({
      title: 'Atención',
      text: 'Seguro que desea cambiar la información',
      icon: 'info',
      showCancelButton: true,
      showConfirmButton: true
    }).then(result => {
      if (result.isConfirmed) {
        this._proyectosService.saveProyecto(proyectoToSave).then(() => {
          this.router.navigateByUrl('/admin/proyectos');
        });
      }
    });

  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe()
    }
    if (this.subProyecto) {
      this.subProyecto.unsubscribe();
    }
  }

}
