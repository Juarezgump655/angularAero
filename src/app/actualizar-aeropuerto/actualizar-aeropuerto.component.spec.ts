import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarAeropuertoComponent } from './actualizar-aeropuerto.component';

describe('ActualizarAeropuertoComponent', () => {
  let component: ActualizarAeropuertoComponent;
  let fixture: ComponentFixture<ActualizarAeropuertoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualizarAeropuertoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizarAeropuertoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
