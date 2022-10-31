import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAeropuertoComponent } from './lista-aeropuerto.component';

describe('ListaAeropuertoComponent', () => {
  let component: ListaAeropuertoComponent;
  let fixture: ComponentFixture<ListaAeropuertoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaAeropuertoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaAeropuertoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
