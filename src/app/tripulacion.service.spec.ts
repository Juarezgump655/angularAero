import { TestBed } from '@angular/core/testing';

import { TripulacionService } from './tripulacion.service';

describe('TripulacionService', () => {
  let service: TripulacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TripulacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
