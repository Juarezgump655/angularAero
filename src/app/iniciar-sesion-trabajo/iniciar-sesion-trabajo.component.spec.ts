import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IniciarSesionTrabajoComponent } from './iniciar-sesion-trabajo.component';

describe('IniciarSesionTrabajoComponent', () => {
  let component: IniciarSesionTrabajoComponent;
  let fixture: ComponentFixture<IniciarSesionTrabajoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IniciarSesionTrabajoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IniciarSesionTrabajoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
