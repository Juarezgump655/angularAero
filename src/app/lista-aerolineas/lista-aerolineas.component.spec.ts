import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAerolineasComponent } from './lista-aerolineas.component';

describe('ListaAerolineasComponent', () => {
  let component: ListaAerolineasComponent;
  let fixture: ComponentFixture<ListaAerolineasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaAerolineasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaAerolineasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
