import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {SitioTuristico} from "../../../../../models/SitioTuristico";
import {SitiosTuristicosService} from "../../../../../services/sitios-turisticos.service";
import * as L from 'leaflet';
import {LatLng} from "leaflet";

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
  selector: 'app-sitio-turistico',
  templateUrl: './sitio-turistico.component.html',
  styleUrls: ['./sitio-turistico.component.scss']
})
export class SitioTuristicoComponent implements OnInit, OnDestroy, AfterViewInit {

  sub!: Subscription;
  selectedSitio!: SitioTuristico;
  selectedImg = '';
  responsiveOptions: any;
  lat = -2.9405307;
  lng = -78.923873;
  map!: L.Map;
  marker!: L.Marker;

  constructor(private route: ActivatedRoute,
              private _turismoService: SitiosTuristicosService) {
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
        this.getSitioById(id);
      }
    });
  }

  ngAfterViewInit() {
    this.initMap();
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [this.lat, this.lng],
      zoom: 15
    });

    this.marker = L.marker([this.lat, this.lng], {
      draggable: true
    });

    this.marker.addTo(this.map);

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }

  getSitioById(id: number) {
    this._turismoService.getSitio(id).subscribe((sitio: SitioTuristico) => {
      this.selectedSitio = sitio;
      this.map.panTo(new LatLng(sitio.latitud, sitio.longitud));
      this.marker.setLatLng(new LatLng(sitio.latitud, sitio.longitud));
    })
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

}
