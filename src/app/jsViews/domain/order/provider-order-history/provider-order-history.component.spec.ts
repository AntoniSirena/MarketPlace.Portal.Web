import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderOrderHistoryComponent } from './provider-order-history.component';

describe('ProviderOrderHistoryComponent', () => {
  let component: ProviderOrderHistoryComponent;
  let fixture: ComponentFixture<ProviderOrderHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProviderOrderHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderOrderHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
