import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckAppointmentComponent } from './check-appointment.component';

describe('CheckAppointmentComponent', () => {
  let component: CheckAppointmentComponent;
  let fixture: ComponentFixture<CheckAppointmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckAppointmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
