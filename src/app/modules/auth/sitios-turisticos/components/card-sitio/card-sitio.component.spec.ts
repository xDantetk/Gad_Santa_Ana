import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardSitioComponent } from './card-sitio.component';

describe('CardSitioComponent', () => {
  let component: CardSitioComponent;
  let fixture: ComponentFixture<CardSitioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardSitioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardSitioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
