import { Component, OnInit, HostBinding } from '@angular/core';

import { ProductService } from '../../services/product.service';
import { Product } from 'src/app/models/Product';

@Component({
  selector: 'app-product-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent implements OnInit {

  @HostBinding('class') classes = 'row';

  products: any = [];

  constructor(private productService: ProductService) { }


  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts()
      .subscribe(
        res => {
          this.products = res;
        },
        err => console.error(err)
      );
  }

  deleteGame(id: string) {
    this.productService.deleteProduct(id)
      .subscribe(
        res => {
          console.log(res);
          this.getProducts();
        },
        err => console.error(err)
      )
  }

}
