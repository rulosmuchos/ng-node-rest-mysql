import { Component, OnInit, HostBinding } from '@angular/core';

import { ProductService } from '../../services/product.service';
import { CategoriesService } from '../../services/categories.service';
import { Product } from 'src/app/models/Product';

@Component({
  selector: 'app-product-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent implements OnInit {

  @HostBinding('class') classes = 'row';

  products: any = [];
  catRes:any = null;
  constructor(private productService: ProductService, private catService:CategoriesService) { }


  ngOnInit() {
    
    this.getCategories();
  }

  getProducts() {
    this.productService.getProducts()
      .subscribe(
        res => {
          this.products = res;
          for( var i in res){
            // un poquito de magia por aca
            var cati = this.catRes.findIndex(x => x.id == res[i].category);
            var subcati = this.catRes.findIndex(x => x.id == res[i].subcategory);
            // un poquito de magia por alla
            (typeof this.catRes[cati] != 'undefined')?res[i].catTitle = this.catRes[cati].nombre:null;
            (typeof this.catRes[subcati] != 'undefined')?res[i].subcatTitle= this.catRes[subcati].nombre:null;
          }
        },
        err => console.error(err)
      );
  }
  getCategories(){
    if (this.catRes == null){
      this.catService.getCategories().subscribe(
        res => {
          this.catRes = res;
          this.getProducts();
         },
         err => console.error(err)
       )
   }
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
