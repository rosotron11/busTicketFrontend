import {Component, inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MenuItem } from '../../../interfaces/nav-items';
import { UserService } from '../../../services/user.service';
import { map, Observable, of } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { MenuService } from '../../../services/menu.service';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink, AsyncPipe],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit{
  router = inject(Router);
  menuList$: Observable<MenuItem[]> | undefined;

  constructor(private menuService: MenuService,private userService:UserService) {}

  ngOnInit(): void {
    this.userService.getUserDet().subscribe(loggedData => {
      if (loggedData) {
        const userRole = JSON.parse(JSON.stringify(loggedData)).roles;
        this.menuList$ = this.menuService.getMenuItems().pipe(
          map(menuItems => menuItems.filter(item => item.roles!.includes(userRole)))
        )
      }
    })
  }
}
