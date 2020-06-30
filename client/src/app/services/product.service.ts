import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/Product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  API_URI = 'https://app.avellanedacompras.com/api';

  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get(`${this.API_URI}/products`);
  }

  getProduct(id: string) {
    return this.http.get(`${this.API_URI}/products/${id}`);
  }

  deleteProduct(id: string) {
    return this.http.delete(`${this.API_URI}/products/${id}`);
  }

  saveProduct(game: Product) {
    return this.http.post(`${this.API_URI}/products`, game);
  }

  updateProduct(id: string|number, updatedProduct: Product): Observable<Product> {
    return this.http.put(`${this.API_URI}/products/${id}`, updatedProduct);
  }

}
