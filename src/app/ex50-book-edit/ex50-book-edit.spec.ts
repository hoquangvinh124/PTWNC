import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ex50BookEdit } from './ex50-book-edit';

describe('Ex50BookEdit', () => {
  let component: Ex50BookEdit;
  let fixture: ComponentFixture<Ex50BookEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ex50BookEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ex50BookEdit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
