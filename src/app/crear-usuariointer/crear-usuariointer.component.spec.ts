import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearUsuariointerComponent } from './crear-usuariointer.component';

describe('CrearUsuariointerComponent', () => {
  let component: CrearUsuariointerComponent;
  let fixture: ComponentFixture<CrearUsuariointerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearUsuariointerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearUsuariointerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
