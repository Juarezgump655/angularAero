import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarAerolineaComponent } from './actualizar-aerolinea.component';

describe('ActualizarAerolineaComponent', () => {
  let component: ActualizarAerolineaComponent;
  let fixture: ComponentFixture<ActualizarAerolineaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualizarAerolineaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizarAerolineaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
