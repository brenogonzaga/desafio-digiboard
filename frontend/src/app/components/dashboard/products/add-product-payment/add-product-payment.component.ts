import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CalendarModule } from 'primeng/calendar';
import { ProductPaymentService } from '../../../../service/product-payment.service';
import { MessageService } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CalendarModule,
    CardModule,
    ButtonModule,
    InputNumberModule,
  ],
  standalone: true,
  selector: 'app-add-product-payment',
  templateUrl: './add-product-payment.component.html',
  styleUrls: ['./add-product-payment.component.css'],
})
export class AddProductPaymentComponent {
  paymentForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private productPaymentService: ProductPaymentService,
    private messageService: MessageService,
  ) {
    this.paymentForm = this.fb.group({
      productId: ['', Validators.required],
      userId: ['', Validators.required],
      quantityPaid: ['', Validators.required],
      deliveryDate: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.paymentForm.valid) {
      const productPayment = {
        productId: Number(this.paymentForm.value.productId),
        userId: Number(this.paymentForm.value.userId),
        quantityPaid: this.paymentForm.value.quantityPaid,
        deliveryDate: this.paymentForm.value.deliveryDate,
      };
      this.productPaymentService.addProductPayment(productPayment).subscribe(
        (response) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Payment added',
          });
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: error.error.message,
          });
        },
      );
    }
  }
}
