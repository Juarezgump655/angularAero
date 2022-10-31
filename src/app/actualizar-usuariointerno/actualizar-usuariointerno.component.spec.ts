import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarUsuariointernoComponent } from './actualizar-usuariointerno.component';

describe('ActualizarUsuariointernoComponent', () => {
  let component: ActualizarUsuariointernoComponent;
  let fixture: ComponentFixture<ActualizarUsuariointernoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualizarUsuariointernoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizarUsuariointernoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
