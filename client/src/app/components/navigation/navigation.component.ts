import { Component, OnInit, HostListener } from '@angular/core';
import { AuthService } from "../../services/auth.service";


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(public authService:AuthService){

  }

  @HostListener("click", ["$event"])
  public onClick(event: any): void
  {
    if( !this.isMenuCollapsed ){
      console.log('in!');
      this.isMenuCollapsed = true;
    } else {
      this.isMenuCollapsed = false;
    }
    event.stopPropagation();
  }
  ngOnInit() {
  }
  logOut(){
    this.authService.logOut();
    console.log(this.authService.loggedIn())
  }
  public isMenuCollapsed = true;
  @HostListener('document:click')
  public clickout() {
    console.log('out!');
    this.isMenuCollapsed = true;
  }
}
