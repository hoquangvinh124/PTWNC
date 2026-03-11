import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ex19ListProduct } from './ex19-list-product';

describe('Ex19ListProduct', () => {
  let component: Ex19ListProduct;
  let fixture: ComponentFixture<Ex19ListProduct>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ex19ListProduct]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ex19ListProduct);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
