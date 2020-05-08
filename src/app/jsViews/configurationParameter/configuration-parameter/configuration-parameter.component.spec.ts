import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationParameterComponent } from './configuration-parameter.component';

describe('ConfigurationParameterComponent', () => {
  let component: ConfigurationParameterComponent;
  let fixture: ComponentFixture<ConfigurationParameterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigurationParameterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigurationParameterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
