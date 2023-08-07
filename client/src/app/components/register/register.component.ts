import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service'
import { Router } from '@angular/router'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user = {
    username:'',
    password:''
  }

  constructor(private authService:AuthService, private router:Router) { }

  ngOnInit(): void {
  }

  submit(){
    const s = this.authService.submit(this.user)
    .subscribe(
      res => {
        console.log(res)
         localStorage.setItem('token', res.token )
         this.router.navigate(['/products'])
      },
      err => {
        console.log(err)
      }
    )
  }

  loggedIn(){
    return !!localStorage.getItem('token')
  }
}
