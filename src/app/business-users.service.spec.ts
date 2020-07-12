import { TestBed } from '@angular/core/testing';

import { BusinessUsersService } from './business-users.service';

describe('BusinessUsersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BusinessUsersService = TestBed.get(BusinessUsersService);
    expect(service).toBeTruthy();
  });
});
