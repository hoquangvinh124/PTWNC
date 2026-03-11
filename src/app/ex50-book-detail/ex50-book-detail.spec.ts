import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ex50BookDetail } from './ex50-book-detail';

describe('Ex50BookDetail', () => {
  let component: Ex50BookDetail;
  let fixture: ComponentFixture<Ex50BookDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ex50BookDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ex50BookDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
