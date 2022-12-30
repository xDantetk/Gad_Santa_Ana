import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSitiosTuristicosComponent } from './admin-sitios-turisticos.component';

describe('SitiosTuristicosComponent', () => {
  let component: AdminSitiosTuristicosComponent;
  let fixture: ComponentFixture<AdminSitiosTuristicosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminSitiosTuristicosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminSitiosTuristicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
