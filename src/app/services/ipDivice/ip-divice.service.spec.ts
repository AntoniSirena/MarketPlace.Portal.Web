import { TestBed } from '@angular/core/testing';

import { IpDiviceService } from './ip-divice.service';

describe('IpDiviceService', () => {
  let service: IpDiviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IpDiviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
