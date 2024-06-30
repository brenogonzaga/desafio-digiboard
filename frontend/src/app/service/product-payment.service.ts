import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  CreateProductPayment,
  ProductsPayment,
} from '../interfaces/product-payment';

@Injectable({
  providedIn: 'root',
})
export class ProductPaymentService {
  private apiUrl = 'http://localhost:3000/product-payment';

  constructor(private http: HttpClient) {}

  getProductsPayments(): Observable<ProductsPayment[]> {
    return this.http.get<ProductsPayment[]>(this.apiUrl);
  }

  addProductPayment(productPayment: CreateProductPayment): Observable<any> {
    console.log(productPayment);

    return this.http.post<ProductsPayment>(this.apiUrl, productPayment);
  }
}
