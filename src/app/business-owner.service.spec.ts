import { TestBed } from '@angular/core/testing';

import { BusinessOwnerService } from './business-owner.service';

describe('BusinessOwnerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BusinessOwnerService = TestBed.get(BusinessOwnerService);
    expect(service).toBeTruthy();
  });
});
