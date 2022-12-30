import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SitioTuristico} from "../../../../../models/SitioTuristico";

@Component({
  selector: 'app-card-sitio',
  templateUrl: './card-sitio.component.html',
  styleUrls: ['./card-sitio.component.scss']
})
export class CardSitioComponent implements OnInit {

  @Input() sitio!: SitioTuristico;
  @Output() position = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

}
