import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ex58ClientDetail } from './ex58-client-detail';

describe('Ex58ClientDetail', () => {
  let component: Ex58ClientDetail;
  let fixture: ComponentFixture<Ex58ClientDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ex58ClientDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ex58ClientDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
