import { TestBed } from '@angular/core/testing';

import { TandaService } from './tanda.service';

describe('TandaService', () => {
  let service: TandaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TandaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
