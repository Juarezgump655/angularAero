import { TestBed } from '@angular/core/testing';

import { AsientoService } from './asiento.service';

describe('AsientoService', () => {
  let service: AsientoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AsientoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
