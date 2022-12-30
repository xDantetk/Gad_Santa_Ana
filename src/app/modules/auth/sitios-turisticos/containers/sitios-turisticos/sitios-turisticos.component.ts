import {AfterViewInit, Component, OnInit} from '@angular/core';
import {SitiosTuristicosService} from "../../../../../services/sitios-turisticos.service";
import {Subscription} from "rxjs";
import {SitioTuristico} from "../../../../../models/SitioTuristico";
import * as L from 'leaflet';

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
  selector: 'app-sitios-turisticos',
  templateUrl: './sitios-turisticos.component.html',
  styleUrls: ['./sitios-turisticos.component.scss']
})
export class SitiosTuristicosComponent implements OnInit, AfterViewInit {

  subTurismo!: Subscription;
  sitios: SitioTuristico[] = [];
  lat = -2.9405307;
  lng = -78.923873;
  map!: L.Map;
  marker!: L.Marker;

  constructor(private _turismoService: SitiosTuristicosService) {
  }

  ngOnInit(): void {
    this.subTurismo = this._turismoService.getAllSitios().subscribe(sitios => {
      this.sitios = sitios as SitioTuristico[];
    });
  }

  handleMapClick(e: { lat: number, lng: number }) {
    this.map.panTo(new L.LatLng(e.lat, e.lng));
    this.marker.setLatLng(new L.LatLng(e.lat, e.lng));
  }

  ngAfterViewInit() {
    this.initMap();
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [this.lat, this.lng],
      zoom: 18
    });

    this.marker = L.marker([this.lat, this.lng], {
      draggable: true
    });

    this.marker.addTo(this.map);

    const tiles = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    });

    tiles.addTo(this.map);
  }

}
