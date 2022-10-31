import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarDestinosAutorizadosComponent } from './consultar-destinos-autorizados.component';

describe('ConsultarDestinosAutorizadosComponent', () => {
  let component: ConsultarDestinosAutorizadosComponent;
  let fixture: ComponentFixture<ConsultarDestinosAutorizadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultarDestinosAutorizadosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultarDestinosAutorizadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
