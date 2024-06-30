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
import { ProductService } from '../../../../service/products.service';
import { UserService } from '../../../../service/users.service';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';

@Component({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CalendarModule,
    CardModule,
    ButtonModule,
    InputNumberModule,
    DialogModule,
    CommonModule,
    PaginatorModule,
  ],
  standalone: true,
  selector: 'app-add-product-payment',
  templateUrl: './add-product-payment.component.html',
  styleUrls: ['./add-product-payment.component.css'],
})
export class AddProductPaymentComponent {
  paymentForm: FormGroup;
  showUserDialog: boolean = false;
  showProductDialog: boolean = false;
  usuarios: any[] = [];
  produtos: any[] = [];

  constructor(
    private fb: FormBuilder,
    private productPaymentService: ProductPaymentService,
    private messageService: MessageService,
    private userService: UserService,
    private productService: ProductService,
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
            summary: 'Sucesso',
            detail: 'Pagamento de produto cadastrado com sucesso!',
          });
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro ao cadastrar pagamento de produto',
            detail: error.error.message,
          });
        },
      );
    }
  }

  selectProduct(productId: string) {
    const productControl = this.paymentForm.get('productId');
    if (productControl) {
      productControl.setValue(productId);
    }
    this.showProductDialog = false;
  }

  selectUser(userId: string) {
    const userControl = this.paymentForm.get('userId');
    if (userControl) {
      userControl.setValue(userId);
    }
    this.showUserDialog = false;
  }

  buscarUsuario(page: number = 0) {
    this.userService.getUsers(page, 10).subscribe((response: any) => {
      this.usuarios = response;
      this.showUserDialog = true;
    });
  }

  buscarProduto(page: number = 0) {
    this.productService.getProducts(page, 10).subscribe((response: any) => {
      this.produtos = response;
      this.showProductDialog = true;
    });
  }

  onUserPageChange(event: any) {
    this.buscarUsuario(event.page);
  }

  onProductPageChange(event: any) {
    this.buscarProduto(event.page);
  }
}
