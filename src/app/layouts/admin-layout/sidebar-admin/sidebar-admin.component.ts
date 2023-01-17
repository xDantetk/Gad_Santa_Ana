import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-sidebar-admin',
  templateUrl: './sidebar-admin.component.html',
  styleUrls: ['./sidebar-admin.component.scss']
})
export class SidebarAdminComponent implements OnInit {

  rol = '';

  constructor() { }

  ngOnInit(): void {
    const user = JSON.parse(atob(localStorage.getItem('user') ?? ''));
    this.rol = user.rol;
  }

}
