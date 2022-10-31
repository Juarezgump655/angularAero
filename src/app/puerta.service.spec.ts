import { TestBed } from '@angular/core/testing';

import { PuertaService } from './puerta.service';

describe('PuertaService', () => {
  let service: PuertaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PuertaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
