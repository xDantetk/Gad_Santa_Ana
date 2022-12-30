import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SitioTuristico} from "../../../../../models/SitioTuristico";
import {SitiosTuristicosService} from "../../../../../services/sitios-turisticos.service";
import Swal from 'sweetalert2';
import * as L from 'leaflet';
import {LatLng} from "leaflet";
import {StorageService} from "../../../../../services/storage.service";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../../store/app.state";
import {setLoadingSpinner} from "../../../../../store/shared/shared.actions";

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-admin-sitio-turistico',
  templateUrl: './admin-sitio-turistico.component.html',
  styleUrls: ['./admin-sitio-turistico.component.scss']
})
export class AdminSitioTuristicoComponent implements OnInit, AfterViewInit, OnDestroy {

  sub!: Subscription;
  sitioTuristicoForm!: FormGroup;
  isEdit = false;
  map!: L.Map;
  lat = -2.9405307;
  lng = -78.923873;
  marker!: L.Marker;

  constructor(private route: ActivatedRoute,
              private _turismoService: SitiosTuristicosService,
              private _storageService: StorageService,
              private router: Router,
              private fb: FormBuilder,
              private store: Store<AppState>) {
    this.initSitioTuristicoForm();
  }

  ngOnInit(): void {

    this.sub = this.route.params.subscribe(({id}) => {
      if (id) {
        this.store.dispatch(setLoadingSpinner({status: true}));
        this.isEdit = true;
        this.getSitioById(id);
      }
    });

  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [this.lat, this.lng],
      zoom: 15
    });

    this.marker = L.marker([this.lat, this.lng]);

    this.marker.addTo(this.map);

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);

    this.map.on('click', (e: any) => {
      this.sitioTuristicoForm.patchValue({
        latitud: e.latlng.lat,
        longitud: e.latlng.lng
      });
      this.marker.setLatLng(new LatLng(e.latlng.lat, e.latlng.lng));
      this.map.panTo(new LatLng(e.latlng.lat, e.latlng.lng));
    });
  }

  ngAfterViewInit() {
    this.initMap();
  }

  getSitioById(id: number) {
    this._turismoService.getSitio(id).subscribe((sitio: SitioTuristico) => {

      this.sitioTuristicoForm.patchValue({
        id: sitio.id,
        nombre: sitio.nombre,
        descripcion: sitio.descripcion,
        latitud: sitio.latitud,
        longitud: sitio.longitud,
        banner: sitio.banner,
        carousel: sitio.carousel
      });

      this.marker.setLatLng(new LatLng(sitio.latitud, sitio.longitud));
      this.map.panTo(new LatLng(sitio.latitud, sitio.longitud));
      this.store.dispatch(setLoadingSpinner({status: false}));
    })
  }

  initSitioTuristicoForm() {
    this.sitioTuristicoForm = this.fb.group({
      id: [Date.now(), Validators.required],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      latitud: [this.lat, Validators.required],
      longitud: [this.lng, Validators.required],
      banner: ['', Validators.required],
      carousel: [[], Validators.required]
    });
  }

  onFileChange(event: any) {

    if (event.target.files.length > 0) {
      const file: File = event.target.files[0];
      this._storageService.uploadFile('/turismo/' + this.sitioTuristicoForm.get('id')?.value + '/banner/' + file.name, file).then((url: string) => {
        this.sitioTuristicoForm.patchValue({
          banner: url,
        });
      });
    }
  }

  onFileChangeMulti(event: any) {
    if (event.target.files.length > 0) {
      let uploadTasks: any[] = [];
      for (const file of event.target.files) {
        uploadTasks.push(this._storageService.uploadFile('/turismo/' + this.sitioTuristicoForm.get('id')?.value + '/carousel/' + file.name, file));
      }
      Promise.all(uploadTasks).then(resp => {
        const arrayCarousel = this.sitioTuristicoForm.get('carousel')?.value;
        this.sitioTuristicoForm.patchValue({
          carousel: [...arrayCarousel, ...resp],
        });
      });
    }
  }

  removeAttached(url: string) {
    this._storageService.removeFile(url).then(() => {
      this.sitioTuristicoForm.patchValue({
        banner: "",
      });
    });
  }

  removeAttachedCarousel(url: string) {
    this._storageService.removeFile(url).then(() => {
      const arrayCarousel = this.sitioTuristicoForm.get('carousel')?.value;
      arrayCarousel.splice(arrayCarousel.indexOf(url), 1)
      this.sitioTuristicoForm.patchValue({
        carousel: arrayCarousel,
      });
    });
  }

  saveForm() {
    if (!this.sitioTuristicoForm.valid) {
      this.sitioTuristicoForm.markAllAsTouched();
      return;
    }

    const sitioToSave: SitioTuristico = {
      ...this.sitioTuristicoForm.value
    };

    Swal.fire({
      title: 'Atención',
      text: 'Seguro que desea cambiar la información',
      icon: 'info',
      showCancelButton: true,
      showConfirmButton: true
    }).then(result => {
      if (result.isConfirmed) {
        this._turismoService.saveSitio(sitioToSave).then(() => {
          this.router.navigateByUrl('/admin/turismo');
        });
      }
    });

  }

  get getNameControl() {
    return this.sitioTuristicoForm.get('nombre');
  }

  get getDescriptionControl() {
    return this.sitioTuristicoForm.get('descripcion');
  }

  get getBannerControl() {
    return this.sitioTuristicoForm.get('banner');
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

}
