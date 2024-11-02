import { TestBed } from '@angular/core/testing';

import { ReportegeneraldeclaracionesService } from './reportegeneraldeclaraciones.service';

describe('ReportegeneraldeclaracionesService', () => {
  let service: ReportegeneraldeclaracionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportegeneraldeclaracionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
