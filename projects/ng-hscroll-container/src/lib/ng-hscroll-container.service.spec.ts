import { TestBed } from '@angular/core/testing';

import { NgHscrollContainerService } from './ng-hscroll-container.service';

describe('NgHscrollContainerService', () => {
  let service: NgHscrollContainerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgHscrollContainerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
