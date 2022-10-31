import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearAeropuertoComponent } from './crear-aeropuerto.component';

describe('CrearAeropuertoComponent', () => {
  let component: CrearAeropuertoComponent;
  let fixture: ComponentFixture<CrearAeropuertoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearAeropuertoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearAeropuertoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
