import { TestBed } from '@angular/core/testing';

import { AssAuthGuardService } from './ass-auth-guard.service';

describe('AssAuthGuardService', () => {
  let service: AssAuthGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssAuthGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
