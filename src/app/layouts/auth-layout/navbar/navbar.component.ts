import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  menus = [
    {
      nombre: 'Inicio',
      url: 'home'
    },
    {
      nombre: 'Proyectos',
      url: 'proyectos'
    },
    {
      nombre: 'Sitios Turísticos',
      url: 'sitios-turisticos'
    },
    {
      nombre: 'Emprendimientos',
      url: 'emprendimientos'
    },
    {
      nombre: 'Contáctanos',
      url: 'contactanos'
    }
  ];
  msg = '';

  constructor(private route: Router) {
  }

  handleSubmit(e: any) {
    e.preventDefault();
    this.route.navigate(['busqueda'], {
      queryParams: {
        msg: this.msg
      }
    });
  }

  handleKeyUp(e: any) {
    if (e.keyCode === 13) {
      this.handleSubmit(e);
    }
  }

  ngOnInit(): void {
  }

}
