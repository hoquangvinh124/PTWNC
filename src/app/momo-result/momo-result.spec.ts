import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MomoResult } from './momo-result';

describe('MomoResult', () => {
  let component: MomoResult;
  let fixture: ComponentFixture<MomoResult>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MomoResult]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MomoResult);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
