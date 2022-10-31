import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioDetallesComponent } from './usuario-detalles.component';

describe('UsuarioDetallesComponent', () => {
  let component: UsuarioDetallesComponent;
  let fixture: ComponentFixture<UsuarioDetallesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuarioDetallesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuarioDetallesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
