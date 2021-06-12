import { TestBed } from '@angular/core/testing';

import { QuadrangularService } from './quadrangular.service';

describe('QuadrangularService', () => {
  let service: QuadrangularService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuadrangularService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
