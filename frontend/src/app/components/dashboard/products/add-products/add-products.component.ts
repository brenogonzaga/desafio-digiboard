import { Component } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { MessageService } from 'primeng/api';
import { ProductService } from '../../../../service/products.service';
import { CreateProduct } from '../../../../interfaces/products';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'app-add-products',
  standalone: true,
  imports: [
    CardModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    RouterModule,
    CommonModule,
    InputTextModule,
    CalendarModule,
    CheckboxModule,
    InputNumberModule,
  ],
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css'],
})
export class AddProductsComponent {
  addProductForm = this.fb.group({
    productCode: ['', [Validators.required]],
    description: ['', [Validators.required]],
    imageUrl: ['', [Validators.required]],
    entryDate: ['', [Validators.required]],
    expiryDate: ['', [Validators.required]],
    stock: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private messageService: MessageService,
  ) {}

  get productCode() {
    return this.addProductForm.controls.productCode;
  }

  get description() {
    return this.addProductForm.controls.description;
  }

  get imageUrl() {
    return this.addProductForm.controls.imageUrl;
  }

  get entryDate() {
    return this.addProductForm.controls.entryDate;
  }

  get expiryDate() {
    return this.addProductForm.controls.expiryDate;
  }

  get stock() {
    return this.addProductForm.controls.stock;
  }

  onSubmit() {
    const productForm: CreateProduct = {
      productCode: this.productCode.value || '',
      description: this.description.value || '',
      imageUrl: this.imageUrl.value || '',
      entryDate: new Date(this.entryDate.value ?? new Date()),
      expiryDate: new Date(this.expiryDate.value ?? new Date()),
      stock: Number(this.stock.value) || 0,
    };

    this.productService.addProduct(productForm).subscribe(
      (response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Produto cadastrado com sucesso!',
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
