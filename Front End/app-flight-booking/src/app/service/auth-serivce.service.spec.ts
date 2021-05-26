import { TestBed } from '@angular/core/testing';

import { AuthSerivceService } from './auth-serivce.service';

describe('AuthSerivceService', () => {
  let service: AuthSerivceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthSerivceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
