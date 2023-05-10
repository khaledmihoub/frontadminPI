import { TestBed } from '@angular/core/testing';

import { FichierService } from './fichier.service';

describe('FichierService', () => {
  let service: FichierService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FichierService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
