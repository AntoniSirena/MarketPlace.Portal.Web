import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondFactorAuthenticationComponent } from './second-factor-authentication.component';

describe('SecondFactorAuthenticationComponent', () => {
  let component: SecondFactorAuthenticationComponent;
  let fixture: ComponentFixture<SecondFactorAuthenticationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecondFactorAuthenticationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecondFactorAuthenticationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
