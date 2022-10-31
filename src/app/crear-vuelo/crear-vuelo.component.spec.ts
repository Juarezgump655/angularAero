import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearVueloComponent } from './crear-vuelo.component';

describe('CrearVueloComponent', () => {
  let component: CrearVueloComponent;
  let fixture: ComponentFixture<CrearVueloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearVueloComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearVueloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
