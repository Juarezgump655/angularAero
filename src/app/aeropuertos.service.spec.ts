import { TestBed } from '@angular/core/testing';

import { AeropuertosService } from './aeropuertos.service';

describe('AeropuertosService', () => {
  let service: AeropuertosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AeropuertosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
