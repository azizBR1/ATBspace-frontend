import { TestBed } from '@angular/core/testing';

import { ServicedenavService } from './servicedenav.service';

describe('ServicedenavService', () => {
  let service: ServicedenavService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicedenavService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
