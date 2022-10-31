import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleAeropuertoComponent } from './detalle-aeropuerto.component';

describe('DetalleAeropuertoComponent', () => {
  let component: DetalleAeropuertoComponent;
  let fixture: ComponentFixture<DetalleAeropuertoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleAeropuertoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleAeropuertoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
