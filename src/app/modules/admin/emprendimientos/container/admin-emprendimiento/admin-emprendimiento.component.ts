import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {EmprendimientosService} from "../../../../../services/emprendimientos.service";
import {Emprendimiento} from "../../../../../models/Emprendimiento";
import Swal from "sweetalert2";
import {StorageService} from "../../../../../services/storage.service";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../../store/app.state";
import {setLoadingSpinner} from "../../../../../store/shared/shared.actions";

@Component({
  selector: 'app-admin-emprendimiento',
  templateUrl: './admin-emprendimiento.component.html',
  styleUrls: ['./admin-emprendimiento.component.scss']
})
export class AdminEmprendimientoComponent implements OnInit {

  sub!: Subscription;
  empForm!: FormGroup;
  isEdit = false;

  constructor(private route: ActivatedRoute,
              private _empService: EmprendimientosService,
              private _storageService: StorageService,
              private router: Router,
              private fb: FormBuilder,
              private store: Store<AppState>) {
    this.initSubForm();
  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(({id}) => {
      if (id) {
        this.store.dispatch(setLoadingSpinner({status: true}));
        this.isEdit = true;
        this.getEmpById(id);
      }
    });
  }

  getEmpById(id: number) {
    this._empService.getEmprendimiento(id).subscribe((emp: Emprendimiento) => {
      this.empForm.patchValue({
        id: emp.id,
        nombre: emp.nombre,
        descripcion: emp.descripcion,
        categoria: emp.categoria,
        estado: emp.estado,
        banner: emp.banner
      });
      this.store.dispatch(setLoadingSpinner({status: false}));
    });
  }

  get getNameControl() {
    return this.empForm.get('nombre');
  }

  get getDescriptionControl() {
    return this.empForm.get('descripcion');
  }

  get getCategoriaControl() {
    return this.empForm.get('categoria');
  }

  get getEstadoControl() {
    return this.empForm.get('estado');
  }

  get getBannerControl() {
    return this.empForm.get('banner');
  }

  initSubForm() {
    this.empForm = this.fb.group({
      id: [Date.now(), Validators.required],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      categoria: ['', Validators.required],
      estado: [false, Validators.required],
      banner: ['', Validators.required]
    });
  }

  onFileChange(event: any) {

    if (event.target.files.length > 0) {
      const file: File = event.target.files[0];
      this._storageService.uploadFile('/emprendimientos/' + this.empForm.get('id')?.value + '/banner/' + file.name, file).then((url: string) => {
        this.empForm.patchValue({
          banner: url,
        });
      });
    }
  }

  removeAttached(url: string) {
    this._storageService.removeFile(url).then(() => {
      this.empForm.patchValue({
        banner: "",
      });
    });
  }

  saveForm() {
    if (!this.empForm.valid) {
      this.empForm.markAllAsTouched();
      return;
    }

    const empToSave: Emprendimiento = {
      ...this.empForm.value
    };

    Swal.fire({
      title: 'Atención',
      text: 'Seguro que desea cambiar la información',
      icon: 'info',
      showCancelButton: true,
      showConfirmButton: true
    }).then(result => {
      if (result.isConfirmed) {
        this._empService.saveEmpredimiento(empToSave).then(() => {
          this.router.navigateByUrl('/admin/emprendimientos');
        });
      }
    });
  }

}
