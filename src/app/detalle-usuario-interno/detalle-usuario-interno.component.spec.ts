import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleUsuarioInternoComponent } from './detalle-usuario-interno.component';

describe('DetalleUsuarioInternoComponent', () => {
  let component: DetalleUsuarioInternoComponent;
  let fixture: ComponentFixture<DetalleUsuarioInternoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleUsuarioInternoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleUsuarioInternoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
