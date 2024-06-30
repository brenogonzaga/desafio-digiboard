import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductPaymentComponent } from './add-product-payment.component';

describe('AddProductPaymentComponent', () => {
  let component: AddProductPaymentComponent;
  let fixture: ComponentFixture<AddProductPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddProductPaymentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddProductPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
