import { Component, OnInit, HostBinding } from '@angular/core';
import { Product } from 'src/app/models/Product';
// import { FormData } from "@angular/forms";
import { ProductService } from 'src/app/services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
// import { HttpClient } from "@angular/common/http";
import { HttpClient, HttpHeaders, HttpEventType, HttpEvent } from '@angular/common/http';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';  

const HttpUploadOptions = {
  headers: new HttpHeaders({ "Content-Type": "multipart/form-data" })
}
@Component({
  selector: 'app-product-form',
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.css']
})
export class ProductsFormComponent implements OnInit {

  @HostBinding('class') clases = 'row';

  product: Product = {
    id: 0,
    title: '',
    description: '',
    image: '',
    price:'',
    whapp:'',
    created_at: new Date()
  };

  edit: boolean = false;
  selectedFile:File

  progress: number = 0;

  

  constructor(
    private productService: ProductService, 
    private router: Router, 
    private activatedRoute: ActivatedRoute, 
    private http:HttpClient,  
    config: NgbCarouselConfig) {  
      config.interval = 5000;  
      config.wrap = true;  
      config.keyboard = true;  
      config.pauseOnHover = true; 
   }

  ngOnInit() {
    const params = this.activatedRoute.snapshot.params;
    if (params.id) {
      this.productService.getProduct(params.id)
        .subscribe(
          res => {
            this.product = res;
            this.edit = true;
          },
          err => console.log(err)
        )
    }
  }

  saveNewProduct() {
    delete this.product.created_at;
    delete this.product.id;
    this.productService.saveProduct(this.product)
      .subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/products']);
        },
        err => console.error(err)
      )
  }

  updateProduct() {
    delete this.product.created_at;
    this.productService.updateProduct(this.product.id, this.product)
      .subscribe(
        res => {
          this.router.navigate(['/products']);
        },
        err => console.error(err)
      )
  }
  onFileChanged(comp_event) {
    this.selectedFile = comp_event.target.files[0];
    let input = new FormData();
    // Add your values in here
    input.append('file', this.selectedFile);
    this.http.post('http://app.avellanedacompras.com:8002/upload', input, {
      reportProgress: true,
      observe: 'events'}).subscribe((event: HttpEvent<any>) => {
        switch (event.type) {
          case HttpEventType.Sent:
            break;
          case HttpEventType.ResponseHeader:
            break;
          case HttpEventType.UploadProgress:
            this.progress = Math.round(event.loaded / event.total * 100);
            break;
          case HttpEventType.Response:
            setTimeout(() => {
              console.log(comp_event);
              this.product[comp_event.target.name] = event.body['filename'];
              this.progress = 0;
            }, 1500);
  
        }
      })
    // this.http.post('http://181.164.195.167:8002/upload', input).subscribe(
    //   (res) => {
    //     this.product.image = res['filename'];
    //   }
    // );
  }
}
