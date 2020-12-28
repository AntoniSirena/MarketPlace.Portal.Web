import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueueAppointmentComponent } from './queue-appointment.component';

describe('QueueAppointmentComponent', () => {
  let component: QueueAppointmentComponent;
  let fixture: ComponentFixture<QueueAppointmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueueAppointmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueueAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
