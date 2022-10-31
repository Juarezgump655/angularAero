import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarAeropuertosComponent } from './consultar-aeropuertos.component';

describe('ConsultarAeropuertosComponent', () => {
  let component: ConsultarAeropuertosComponent;
  let fixture: ComponentFixture<ConsultarAeropuertosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultarAeropuertosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultarAeropuertosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
