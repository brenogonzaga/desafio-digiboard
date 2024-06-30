import { Component } from '@angular/core';
import { ProductsPayment } from '../../../../interfaces/product-payment';
import { ProductPaymentService } from '../../../../service/product-payment.service';
import { TableModule } from 'primeng/table';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-list-product-payment',
  standalone: true,
  imports: [TableModule, DatePipe],
  templateUrl: './list-product-payment.component.html',
  styleUrl: './list-product-payment.component.css',
})
export class ListProductPaymentComponent {
  productsPayments: ProductsPayment[] = [];

  constructor(private productPaymentService: ProductPaymentService) {}

  ngOnInit(): void {
    this.productPaymentService.getProductsPayments().subscribe((data) => {
      this.productsPayments = data;
    });
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('pt-BR');
  }

  deleteProductsPayment(productsPayment: ProductsPayment): void {
    console.log(
      `Excluindo pagamento de produto: ${productsPayment.productName}`,
    );
  }
}
