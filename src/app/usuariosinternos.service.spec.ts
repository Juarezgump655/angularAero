import { TestBed } from '@angular/core/testing';

import { UsuariosinternosService } from './usuariosinternos.service';

describe('UsuariosinternosService', () => {
  let service: UsuariosinternosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuariosinternosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
