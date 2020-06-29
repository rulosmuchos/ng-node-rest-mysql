import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http'
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = "http://app.avellanedacompras.com:8002/api"

  constructor( private http:HttpClient, private router:Router) { }

  submit(user){
    return this.http.post<any>(this.URL + '/users', user);
  }
  
  signin(user){
    return this.http.post<any>(this.URL + '/users/signin', user);
  }

  loggedIn(){
    return !!localStorage.getItem('token');
  }

  getToken(){
    return localStorage.getItem('token');
  }

  logOut(){
    localStorage.removeItem('token');
    this.router.navigate(['/login'])
  }

}
