import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PantallaTrabajadoresComponent } from './pantalla-trabajadores.component';

describe('PantallaTrabajadoresComponent', () => {
  let component: PantallaTrabajadoresComponent;
  let fixture: ComponentFixture<PantallaTrabajadoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PantallaTrabajadoresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PantallaTrabajadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
