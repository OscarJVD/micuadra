import { TestBed } from '@angular/core/testing';

import { TravelpgService } from './travelpg.service';

describe('TravelpgService', () => {
  let service: TravelpgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TravelpgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
