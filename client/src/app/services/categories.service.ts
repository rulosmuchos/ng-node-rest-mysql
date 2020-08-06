import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http'
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  API_URI = 'http://app.avellanedacompras.com/api';

  constructor(private http: HttpClient) { }
  getCategories(){
    return this.http.get(`${this.API_URI}/categories`)
  }
}
