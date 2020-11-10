import { TestBed } from '@angular/core/testing';

import { MyFilesService } from './my-files.service';

describe('MyFilesService', () => {
  let service: MyFilesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyFilesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
