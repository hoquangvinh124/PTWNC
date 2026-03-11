import { TestBed } from '@angular/core/testing';

import { Ex13 } from './ex13';

describe('Ex13', () => {
  let service: Ex13;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Ex13);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
