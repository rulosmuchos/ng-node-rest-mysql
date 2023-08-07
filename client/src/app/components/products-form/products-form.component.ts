import { Component, OnInit, HostBinding } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders, HttpEventType, HttpEvent } from '@angular/common/http';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';  
import { CategoriesService } from '../../services/categories.service'

const HttpUploadOptions = {
  headers: new HttpHeaders({ "Content-Type": "multipart/form-data" })
}
@Component({
  selector: 'app-product-form',
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.scss']
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
    created_at: new Date(),
    category:0,
    subcategory:0,
  };


  edit: boolean = false;
  selectedFile:File

  progress: number = 0;

  

  constructor(
    private catService:CategoriesService,
    private productService: ProductService, 
    private router: Router, 
    private activatedRoute: ActivatedRoute, 
    private http:HttpClient,  
    config: NgbCarouselConfig
    ){  
      config.interval = 5000;  
      config.wrap = true;  
      config.keyboard = true;  
      config.pauseOnHover = true; 
  }
  catRes:any = null;
  catList:any = [{nombre: 'Loading...'}];
  subcatList:any = [{nombre: 'Loading...'}];
  tallesArray = [];
  coloresArray = [];
  ngOnInit() {
    const params = this.activatedRoute.snapshot.params;
    if (params.id) {
      this.productService.getProduct(params.id)
        .subscribe(
          res => {
            var _res = res;
            // console.log(_res['talles'].split(','))
            (_res['talles'] != null)? this.tallesArray  = _res['talles'].split(','):null;
            (_res['colores']!=null)? this.coloresArray = _res['colores'].split(','):null;
            this.product = res;
            this.getCategories();
            this.edit = true;
          },
          err => console.log(err)
        )
    }else{
      this.getCategories();
      this.edit = false;
    }
  }

  getCategories(){
     this.catList = [{nombre: 'Loading...'}];
     if (this.catRes == null){
       this.catService.getCategories().subscribe(
         res => {
           this.catRes = res;
           var _cl=[];
           for ( var element in this.catRes) {
             if(this.catRes[element].padre == 0){
               _cl.push(this.catRes[element]);
              }
            }
            this.catList = _cl;
            if(this.product.category!=0){
              this.getSubCategories();
              }
          },
          err => console.error(err)
        )
    }
  }    
  getSubCategories(){
    var padre = this.product.category;
    this.subcatList = [{nombre: 'Loading...'}];
    var _ctl=[];
    for ( var element in this.catRes) {
      if(this.catRes[element].padre == padre){
        _ctl.push(this.catRes[element]);
      }
    };
    this.subcatList = _ctl;
  }
  saveNewProduct() {
    delete this.product.created_at;
    delete this.product.id;
    this.product.talles = this.tallesArray.toString();
    this.product.colores = this.coloresArray.toString();
    this.productService.saveProduct(this.product).subscribe(
      res => {
        console.log(res);
        console.log(this.product);
        this.router.navigate(['/products']);
      },
      err => console.error(err)
     )
  }
    
  updateProduct() {
    delete this.product.created_at;
    this.product.talles = this.tallesArray.toString();
    this.product.colores = this.coloresArray.toString();
    this.productService.updateProduct(this.product.id, this.product).subscribe(
      res => {
        this.router.navigate(['/products']);
      },
      err => console.error(err)
    )
  }
  deleteProduct(id: number) {
    this.productService.deleteProduct(this.product.id)
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
    input.append('file', this.selectedFile);
    this.http.post('https://localhost/upload', input, {
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
                this.product[comp_event.target.name] = event.body['filename'];
                this.progress = 0;
              }, 1500);
        }
      }
    )
  }
  onCatChanged(count:Number) {
    console.log( count);
    this.getSubCategories();
    }
  }
                