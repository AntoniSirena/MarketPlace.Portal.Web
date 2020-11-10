import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoveltyComponent } from './novelty.component';

describe('NoveltyComponent', () => {
  let component: NoveltyComponent;
  let fixture: ComponentFixture<NoveltyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoveltyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoveltyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
