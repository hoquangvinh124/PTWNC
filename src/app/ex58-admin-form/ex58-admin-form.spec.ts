import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ex58AdminForm } from './ex58-admin-form';

describe('Ex58AdminForm', () => {
  let component: Ex58AdminForm;
  let fixture: ComponentFixture<Ex58AdminForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ex58AdminForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ex58AdminForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
