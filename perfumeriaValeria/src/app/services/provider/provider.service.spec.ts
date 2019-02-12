import { TestBed } from '@angular/core/testing';

import { ProviderServieService } from './provider-servie.service';

describe('ProviderServieService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProviderServieService = TestBed.get(ProviderServieService);
    expect(service).toBeTruthy();
  });
});
