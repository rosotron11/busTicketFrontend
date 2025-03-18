import {Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MenuItem } from '../interfaces/nav-items';
import { UserService } from '../services/user.service';
import { Observable, of } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink, AsyncPipe],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit{
  userService=inject(UserService)
  router=inject(Router);
  menuList:MenuItem[] = [
      {path:'/home',title:'Home', roles:['passenger','all','conductor']},
      {path:'/search',title:'Search Buses', roles:['passenger','all','conductor']},
      {path:'/bus/create',title:'Add your Bus', roles:['conductor']},
      {path:'/my-ticket',title:'My Tickets', roles:['conductor','passenger']},
      {path:'/my-bus',title:'My Buses', roles:['conductor']},
      {path:'/login',title:'Login', roles:['all']},
      {path:'/register',title:'Register', roles:['all']},
      {path:'/profile',title:'Profile',roles:['passenger','conductor']},
      {path:'/logout',title:'Logout', roles:['passenger','conductor']},
  ]

  loggedUserMenuList: Observable<any[]>= new Observable<any[]>

  ngOnInit(): void {
      const loggedData=localStorage.getItem('userDet');
      if(loggedData)
      {
        const userData=JSON.parse(loggedData)
        this.loggedUserMenuList = of(this.menuList.filter(x=>x.roles?.includes(userData.roles)))
      }
      // this.userService.getUserDet().subscribe(x=>
      //   {
      //     this.loggedUserMenuList=this.menuList.filter(y=>y.roles?.includes(x.roles))
      //   }
      //   )
  }
  
}
