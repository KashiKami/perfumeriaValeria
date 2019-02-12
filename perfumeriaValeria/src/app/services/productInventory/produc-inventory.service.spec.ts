import { TestBed } from '@angular/core/testing';

import { ProducInventoryService } from './produc-inventory.service';

describe('ProducInventoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProducInventoryService = TestBed.get(ProducInventoryService);
    expect(service).toBeTruthy();
  });
});
