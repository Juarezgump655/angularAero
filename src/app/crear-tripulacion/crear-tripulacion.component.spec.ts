import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearTripulacionComponent } from './crear-tripulacion.component';

describe('CrearTripulacionComponent', () => {
  let component: CrearTripulacionComponent;
  let fixture: ComponentFixture<CrearTripulacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearTripulacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearTripulacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
