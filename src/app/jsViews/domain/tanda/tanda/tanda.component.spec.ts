import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TandaComponent } from './tanda.component';

describe('TandaComponent', () => {
  let component: TandaComponent;
  let fixture: ComponentFixture<TandaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TandaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TandaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
