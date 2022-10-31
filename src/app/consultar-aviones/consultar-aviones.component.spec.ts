import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarAvionesComponent } from './consultar-aviones.component';

describe('ConsultarAvionesComponent', () => {
  let component: ConsultarAvionesComponent;
  let fixture: ComponentFixture<ConsultarAvionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultarAvionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultarAvionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
