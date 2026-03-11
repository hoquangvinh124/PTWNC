import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ex58ClientList } from './ex58-client-list';

describe('Ex58ClientList', () => {
  let component: Ex58ClientList;
  let fixture: ComponentFixture<Ex58ClientList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ex58ClientList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ex58ClientList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
