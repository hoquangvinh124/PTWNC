import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Momo } from './momo';

describe('Momo', () => {
  let component: Momo;
  let fixture: ComponentFixture<Momo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Momo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Momo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
