import { TestBed, inject } from '@angular/core/testing';

import { DbhelpService } from './dbhelp.service';

describe('DbhelpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DbhelpService]
    });
  });

  it('should be created', inject([DbhelpService], (service: DbhelpService) => {
    expect(service).toBeTruthy();
  }));
});
