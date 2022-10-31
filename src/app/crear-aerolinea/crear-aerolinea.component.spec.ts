import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearAerolineaComponent } from './crear-aerolinea.component';

describe('CrearAerolineaComponent', () => {
  let component: CrearAerolineaComponent;
  let fixture: ComponentFixture<CrearAerolineaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearAerolineaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearAerolineaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
