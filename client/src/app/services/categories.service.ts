import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http'
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  API_URI = 'http://localhost:8004/api';

  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get(`${this.API_URI}/categories`);
  }


  countryList = {};
  stateList = {
      1:['Duesseldorf', 'Leinfelden-Echterdingen', 'Eschborn'],
      2:['barcelona'],
      3:['Downers Grove'],
      4:['Puebla'],
      5:['Beijing']  
  };
  getCategories(){
    // this.countryList = this.http.get(`${this.API_URI}/categories`);
    // console.log(this.http.get(`${this.API_URI}/categories`));
    return this.http.get(`${this.API_URI}/categories`)
  }
  getSubcategories(id){
    return this.stateList[id];
  }
}
