import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ex19ServiceProduct } from './ex19-service-product';

describe('Ex19ServiceProduct', () => {
  let component: Ex19ServiceProduct;
  let fixture: ComponentFixture<Ex19ServiceProduct>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ex19ServiceProduct]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ex19ServiceProduct);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
