import { Component, OnInit } from '@angular/core';
import { Product, UpdateProduct } from '../../../../interfaces/products';
import { ProductService } from '../../../../service/products.service';
import { TableModule } from 'primeng/table';
import { DatePipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Router, RouterLink } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-list-products',
  standalone: true,
  imports: [TableModule, DatePipe, ButtonModule, RouterLink],
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.css',
})
export class ListProductsComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private messageService: MessageService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
    });
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('pt-BR');
  }

  updateProduct(id: number, product: UpdateProduct): void {
    this.productService.updateProduct(id, product).subscribe(
      (response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Product Success',
          detail: 'You have updated the product successfully',
        });
        this.router.navigate(['/dashboard/list-products']);
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Product Error',
          detail: 'An error occurred while updating the product',
        });
      },
    );
  }

  deleteProduct(product: Product): void {
    this.productService.deleteProduct(product.id).subscribe(
      (response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Product Success',
          detail: 'You have deleted the product successfully',
        });
        this.router.navigate(['/dashboard/list-products']);
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Product Error',
          detail: 'An error occurred while deleting the product',
        });
      },
    );
  }
}
