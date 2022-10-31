import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActuliazarAvionComponent } from './actuliazar-avion.component';

describe('ActuliazarAvionComponent', () => {
  let component: ActuliazarAvionComponent;
  let fixture: ComponentFixture<ActuliazarAvionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActuliazarAvionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActuliazarAvionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
