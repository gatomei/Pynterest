import { TestBed } from '@angular/core/testing';

import { FollowDialogService } from './follow-dialog.service';

describe('FollowDialogService', () => {
  let service: FollowDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FollowDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
