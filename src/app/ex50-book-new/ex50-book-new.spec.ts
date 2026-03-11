import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ex50BookNew } from './ex50-book-new';

describe('Ex50BookNew', () => {
  let component: Ex50BookNew;
  let fixture: ComponentFixture<Ex50BookNew>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ex50BookNew]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ex50BookNew);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
