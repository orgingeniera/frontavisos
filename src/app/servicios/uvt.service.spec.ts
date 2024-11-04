import { TestBed } from '@angular/core/testing';

import { UvtService } from './uvt.service';

describe('UvtService', () => {
  let service: UvtService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UvtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
