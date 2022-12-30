import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SitioTuristicoComponent } from './sitio-turistico.component';

describe('SitioTuristicoComponent', () => {
  let component: SitioTuristicoComponent;
  let fixture: ComponentFixture<SitioTuristicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SitioTuristicoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SitioTuristicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
