import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EducativeCenterComponent } from './educative-center.component';

describe('EducativeCenterComponent', () => {
  let component: EducativeCenterComponent;
  let fixture: ComponentFixture<EducativeCenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EducativeCenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EducativeCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
