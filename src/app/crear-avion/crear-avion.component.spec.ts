import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearAvionComponent } from './crear-avion.component';

describe('CrearAvionComponent', () => {
  let component: CrearAvionComponent;
  let fixture: ComponentFixture<CrearAvionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearAvionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearAvionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
