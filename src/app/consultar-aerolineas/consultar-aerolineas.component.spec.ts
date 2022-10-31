import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarAerolineasComponent } from './consultar-aerolineas.component';

describe('ConsultarAerolineasComponent', () => {
  let component: ConsultarAerolineasComponent;
  let fixture: ComponentFixture<ConsultarAerolineasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultarAerolineasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultarAerolineasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
