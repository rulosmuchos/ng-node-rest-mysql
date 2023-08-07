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
            // var cati = this.catRes.findIndex(x => x.id == res[i].category);
            // var subcati = this.catRes.findIndex(x => x.id == res[i].subcategory);
            // // un poquito de magia por alla
            // (typeof this.catRes[cati] != 'undefined')?res[i].catTitle = this.catRes[cati].nombre:null;
            // (typeof this.catRes[subcati] != 'undefined')?res[i].subcatTitle= this.catRes[subcati].nombre:null;
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
 enableProduct(prod:Product) {
  var product = prod;
  product['enable']  = '1';
  console.log(product)
  this.productService.enableProduct(product)
    .subscribe(
      res => {
        console.log(res);
        this.getProducts();
      },
      err => console.error(err)
    )
}
disableProduct(prod:Product) {
  var product = prod;
  product['enable']  = '0';
  delete product['subcatTitle'];
  delete product['catTitle'];
  this.productService.enableProduct(product)
    .subscribe(
      res => {
        console.log(res);
        this.getProducts();
      },
      err => console.error(err)
    )
}
getCatTitle(catId:any){
  // La magia se mudo aca
  
  var cati = this.catRes.findIndex(x => x.id == catId);
  if(this.catRes[cati] == undefined){
    return("");
  }
  var catTitle = this.catRes[cati].nombre
  return(catTitle);
}
}
