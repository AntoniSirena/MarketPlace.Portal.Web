import { TestBed } from '@angular/core/testing';

import { AccompanimentInstrumentService } from './accompaniment-instrument.service';

describe('AccompanimentInstrumentService', () => {
  let service: AccompanimentInstrumentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccompanimentInstrumentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
