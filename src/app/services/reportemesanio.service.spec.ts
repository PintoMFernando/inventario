import { TestBed } from '@angular/core/testing';

import { ReportemesanioService } from './reportemesanio.service';

describe('ReportemesanioService', () => {
  let service: ReportemesanioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportemesanioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
