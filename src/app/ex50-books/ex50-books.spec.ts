import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ex50Books } from './ex50-books';

describe('Ex50Books', () => {
  let component: Ex50Books;
  let fixture: ComponentFixture<Ex50Books>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ex50Books]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ex50Books);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
