import { TestBed } from '@angular/core/testing';

import { EducativeCenterService } from './educative-center.service';

describe('EducativeCenterService', () => {
  let service: EducativeCenterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EducativeCenterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
