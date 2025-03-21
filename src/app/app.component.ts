import { Component, inject, OnInit } from '@angular/core';
import { NavBarComponent } from "./pages/all/nav-bar/nav-bar.component";
import { Router, RouterOutlet } from '@angular/router';
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
    // else
    // {
    //   if(auth && JSON.parse(userDet).jwt)
    //   {
    //     localStorage.setItem('isAuthenticated','false')
    //     this.userService.check(JSON.parse(userDet).jwt).subscribe((res:any)=>{
    //       if(res==false)
    //       {
    //         inject(Router).navigateByUrl('/logout');
    //       } 
    //       else
    //       {
    //         localStorage.setItem('isAuthenticated','true')
    //       }        
    //     })
    //   }
    //   if(!JSON.parse(userDet).jwt)
    //   {
    //     inject(Router).navigateByUrl('/logout');
    //   }
    // }
  }
  title = 'busTicketFrontend';
  
}
