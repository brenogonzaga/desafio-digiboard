import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { ProductService } from '../../../../service/products.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-update-products',
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
  ],
  templateUrl: './update-products.component.html',
  styleUrl: './update-products.component.css',
})
export class UpdateProductsComponent {
  updateProductForm = this.fb.group({
    productCode: ['', [Validators.required]],
    description: ['', [Validators.required]],
    imageUrl: ['', [Validators.required]],
    entryDate: [null as any, [Validators.required]],
    expiryDate: [null as any, [Validators.required]],
    stock: [0, [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    private messageService: MessageService,
  ) {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.productService.getProductById(id).subscribe((data) => {
          const formattedData = {
            ...data,
            entryDate: data.entryDate ? new Date(data.entryDate) : null,
            expiryDate: data.expiryDate ? new Date(data.expiryDate) : null,
          };
          this.updateProductForm.patchValue(formattedData);
        });
      }
    });
  }

  get productCode() {
    return this.updateProductForm.controls.productCode;
  }

  get description() {
    return this.updateProductForm.controls.description;
  }

  get imageUrl() {
    return this.updateProductForm.controls.imageUrl;
  }

  get entryDate() {
    return this.updateProductForm.controls.entryDate;
  }

  get expiryDate() {
    return this.updateProductForm.controls.expiryDate;
  }

  get stock() {
    return this.updateProductForm.controls.stock;
  }

  onSubmit() {
    if (this.updateProductForm.invalid) {
      return;
    }
    const formValue = this.updateProductForm.value;
    const id = this.route.snapshot.params['id'];
    const formattedData = {
      productCode: formValue.productCode || '',
      description: formValue.description || '',
      imageUrl: formValue.imageUrl || '',
      stock: formValue.stock || 0,
      entryDate: formValue.entryDate.toISOString(),
      expiryDate: formValue.expiryDate.toISOString(),
    };
    this.productService.updateProduct(id, formattedData).subscribe(
      (response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Produto atualizado com sucesso!',
        });
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro ao atualizar produto',
          detail: error.error.message,
        });
      },
    );
  }
}
