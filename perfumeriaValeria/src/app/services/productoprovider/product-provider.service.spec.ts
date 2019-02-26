import { TestBed } from '@angular/core/testing';

import { ProductProviderService } from './productprovider.service';

describe('ProductProviderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductProviderService = TestBed.get(ProductProviderService);
    expect(service).toBeTruthy();
  });
});
