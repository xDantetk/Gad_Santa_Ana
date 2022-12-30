import { TestBed } from '@angular/core/testing';

import { SitiosTuristicosService } from './sitios-turisticos.service';

describe('SitiosTuristicosService', () => {
  let service: SitiosTuristicosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SitiosTuristicosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
