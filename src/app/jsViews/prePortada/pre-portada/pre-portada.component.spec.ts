import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrePortadaComponent } from './pre-portada.component';

describe('PrePortadaComponent', () => {
  let component: PrePortadaComponent;
  let fixture: ComponentFixture<PrePortadaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrePortadaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrePortadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
