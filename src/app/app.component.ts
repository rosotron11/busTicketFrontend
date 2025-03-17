import { Component, inject, OnInit } from '@angular/core';
import { NavBarComponent } from "./nav-bar/nav-bar.component";
import { RouterOutlet } from '@angular/router';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  userService=inject(UserService)
  ngOnInit(): void {
    const auth=localStorage.getItem('isAuthenticated')
    const userDet=localStorage.getItem('userDet')
    if(!auth)
    {
      localStorage.setItem('isAuthenticated','false')
    }
    if(!userDet)
    {
      localStorage.setItem('userDet','{"roles":"all"}')
    }
  }
  title = 'busTicketFrontend';
  
}
