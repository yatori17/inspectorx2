import { TestBed, inject } from '@angular/core/testing';

import { SplitArtifactService } from './split-artifact.service';

describe('SplitArtifactService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SplitArtifactService]
    });
  });

  it('should be created', inject([SplitArtifactService], (service: SplitArtifactService) => {
    expect(service).toBeTruthy();
  }));
});
