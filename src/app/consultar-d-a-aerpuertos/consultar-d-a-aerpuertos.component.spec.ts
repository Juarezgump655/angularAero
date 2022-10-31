import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarDAAerpuertosComponent } from './consultar-d-a-aerpuertos.component';

describe('ConsultarDAAerpuertosComponent', () => {
  let component: ConsultarDAAerpuertosComponent;
  let fixture: ComponentFixture<ConsultarDAAerpuertosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultarDAAerpuertosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultarDAAerpuertosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
