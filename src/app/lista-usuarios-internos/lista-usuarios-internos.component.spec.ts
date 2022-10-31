import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaUsuariosInternosComponent } from './lista-usuarios-internos.component';

describe('ListaUsuariosInternosComponent', () => {
  let component: ListaUsuariosInternosComponent;
  let fixture: ComponentFixture<ListaUsuariosInternosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaUsuariosInternosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaUsuariosInternosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
