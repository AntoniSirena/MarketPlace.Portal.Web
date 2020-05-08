import { TestBed } from '@angular/core/testing';

import { ConfigurationParameterService } from './configuration-parameter.service';

describe('ConfigurationParameterService', () => {
  let service: ConfigurationParameterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfigurationParameterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
