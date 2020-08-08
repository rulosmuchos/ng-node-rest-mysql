import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/Product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  API_URI = 'https://localhost/api';

  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get(`${this.API_URI}/products`);
  }

  getProduct(id: string) {
    return this.http.get(`${this.API_URI}/products/${id}`);
  }

  deleteProduct(id: number) {
    console.log(id);
    return this.http.delete(`${this.API_URI}/products/${id}`);
  }
  enableProduct(product:Product) {
    return this.http.put(`${this.API_URI}/products/${product.id}`, product);
  }
  saveProduct(product: Product) {
    return this.http.post(`${this.API_URI}/products`, product);
  }

  updateProduct(id: string|number, updatedProduct: Product): Observable<Product> {
    return this.http.put(`${this.API_URI}/products/${id}`, updatedProduct);
  }

}
