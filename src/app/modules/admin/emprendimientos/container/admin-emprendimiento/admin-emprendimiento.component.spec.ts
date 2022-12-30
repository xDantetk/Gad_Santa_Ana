import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEmprendimientoComponent } from './admin-emprendimiento.component';

describe('AdminEmprendimientoComponent', () => {
  let component: AdminEmprendimientoComponent;
  let fixture: ComponentFixture<AdminEmprendimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminEmprendimientoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminEmprendimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
