import { TestBed } from '@angular/core/testing';

import { AerolineaService } from './aerolinea.service';

describe('AerolineaService', () => {
  let service: AerolineaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AerolineaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
