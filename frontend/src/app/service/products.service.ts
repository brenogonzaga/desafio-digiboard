import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateProduct, Product, UpdateProduct } from '../interfaces/products';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/product';

  constructor(private http: HttpClient) {}

  getProducts(take: number = 10, skip: number = 0): Observable<Product[]> {
    const params = new HttpParams()
      .set('take', take.toString())
      .set('skip', skip.toString());

    return this.http.get<Product[]>(this.apiUrl, { params });
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateProduct(id: number, product: UpdateProduct) {
    return this.http.patch(`${this.apiUrl}/${id}`, product);
  }

  addProduct(product: CreateProduct): Observable<any> {
    return this.http.post(this.apiUrl, product);
  }
}
