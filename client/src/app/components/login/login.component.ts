import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = {
    username:'',
    password:''
  }

  constructor(
    private authService:AuthService,
    private router:Router
  ) { }

  ngOnInit(): void {
  }

  submit(user){
    console.log(user)
    const s = this.authService.signin(this.user)
    .subscribe(
      res => {
         localStorage.setItem('token', res.token )
         this.router.navigate(['/products'])
      },
      err => {
        console.log("error "+err)
      }
    )
  }

  loggedIn(){
    return !!localStorage.getItem('token')
  }

}
