import { TestBed } from '@angular/core/testing';

import { PageaccessService } from './pageaccess.service';

describe('PageaccessService', () => {
  let service: PageaccessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PageaccessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
