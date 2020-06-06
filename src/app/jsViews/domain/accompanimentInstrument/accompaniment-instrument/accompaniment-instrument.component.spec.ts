import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccompanimentInstrumentComponent } from './accompaniment-instrument.component';

describe('AccompanimentInstrumentComponent', () => {
  let component: AccompanimentInstrumentComponent;
  let fixture: ComponentFixture<AccompanimentInstrumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccompanimentInstrumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccompanimentInstrumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
