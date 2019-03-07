import { TestBed } from '@angular/core/testing';

import { OrderProviderService } from './order-provider.service';

describe('OrderProviderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrderProviderService = TestBed.get(OrderProviderService);
    expect(service).toBeTruthy();
  });
});
