import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarEquipajeVueloComponent } from './consultar-equipaje-vuelo.component';

describe('ConsultarEquipajeVueloComponent', () => {
  let component: ConsultarEquipajeVueloComponent;
  let fixture: ComponentFixture<ConsultarEquipajeVueloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultarEquipajeVueloComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultarEquipajeVueloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
