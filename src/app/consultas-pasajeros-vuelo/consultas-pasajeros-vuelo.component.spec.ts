import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultasPasajerosVueloComponent } from './consultas-pasajeros-vuelo.component';

describe('ConsultasPasajerosVueloComponent', () => {
  let component: ConsultasPasajerosVueloComponent;
  let fixture: ComponentFixture<ConsultasPasajerosVueloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultasPasajerosVueloComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultasPasajerosVueloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
