import { TestBed } from '@angular/core/testing';

import { ReportediaService } from './reportedia.service';

describe('ReportediaService', () => {
  let service: ReportediaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportediaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
