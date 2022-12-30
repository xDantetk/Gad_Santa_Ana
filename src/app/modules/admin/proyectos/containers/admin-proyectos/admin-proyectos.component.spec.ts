import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProyectosComponent } from './admin-proyectos.component';

describe('AdminProyectosComponent', () => {
  let component: AdminProyectosComponent;
  let fixture: ComponentFixture<AdminProyectosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminProyectosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminProyectosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
