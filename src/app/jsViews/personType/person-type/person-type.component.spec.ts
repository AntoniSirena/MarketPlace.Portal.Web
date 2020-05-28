import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonTypeComponent } from './person-type.component';

describe('PersonTypeComponent', () => {
  let component: PersonTypeComponent;
  let fixture: ComponentFixture<PersonTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
