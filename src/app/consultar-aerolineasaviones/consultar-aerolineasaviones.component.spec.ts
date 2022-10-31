import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarAerolineasavionesComponent } from './consultar-aerolineasaviones.component';

describe('ConsultarAerolineasavionesComponent', () => {
  let component: ConsultarAerolineasavionesComponent;
  let fixture: ComponentFixture<ConsultarAerolineasavionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultarAerolineasavionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultarAerolineasavionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
