import { TestBed } from '@angular/core/testing';

import { BoletosService } from './boletos.service';

describe('BoletosService', () => {
  let service: BoletosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoletosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
