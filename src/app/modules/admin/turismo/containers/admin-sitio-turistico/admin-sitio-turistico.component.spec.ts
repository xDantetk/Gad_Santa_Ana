import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSitioTuristicoComponent } from './admin-sitio-turistico.component';

describe('AdminSitioTuristicoComponent', () => {
  let component: AdminSitioTuristicoComponent;
  let fixture: ComponentFixture<AdminSitioTuristicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminSitioTuristicoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminSitioTuristicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
