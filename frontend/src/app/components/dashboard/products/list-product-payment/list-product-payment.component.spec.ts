import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProductPaymentComponent } from './list-product-payment.component';

describe('ListProductPaymentComponent', () => {
  let component: ListProductPaymentComponent;
  let fixture: ComponentFixture<ListProductPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListProductPaymentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListProductPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
