import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ex58AdminList } from './ex58-admin-list';

describe('Ex58AdminList', () => {
  let component: Ex58AdminList;
  let fixture: ComponentFixture<Ex58AdminList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ex58AdminList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ex58AdminList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
