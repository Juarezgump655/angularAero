import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaVuelosUsuarioComponent } from './consulta-vuelos-usuario.component';

describe('ConsultaVuelosUsuarioComponent', () => {
  let component: ConsultaVuelosUsuarioComponent;
  let fixture: ComponentFixture<ConsultaVuelosUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultaVuelosUsuarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultaVuelosUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
