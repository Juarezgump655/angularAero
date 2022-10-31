import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarVueloComponent } from './consultar-vuelo.component';

describe('ConsultarVueloComponent', () => {
  let component: ConsultarVueloComponent;
  let fixture: ComponentFixture<ConsultarVueloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultarVueloComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultarVueloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
